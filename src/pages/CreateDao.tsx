import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Plus, Trash2, ArrowLeft, ArrowRight, Upload, Info, Globe, AlertTriangle, Minus, Check, Link as LinkIcon } from 'lucide-react';
import { useDao } from '../context/DaoContext';

interface Link {
  id: string;
  name: string;
  url: string;
}

interface MultisigMember {
  id: string;
  address: string;
}

export const CreateDao: React.FC = () => {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const { setCurrentDao, addDao } = useDao();
  
  // Form state
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [multisigMembers, setMultisigMembers] = useState<MultisigMember[]>([]);
  const [minimumApproval, setMinimumApproval] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmValues, setConfirmValues] = useState(false);
  
  // Character count
  const [nameCharCount, setNameCharCount] = useState(0);
  
  // Add connected wallet as first multisig member
  useEffect(() => {
    if (connected && publicKey && multisigMembers.length === 0) {
      setMultisigMembers([
        { id: '1', address: publicKey.toString() }
      ]);
    }
  }, [connected, publicKey]);

  // Update minimum approval if it's greater than the number of members
  useEffect(() => {
    if (minimumApproval > multisigMembers.length) {
      setMinimumApproval(multisigMembers.length);
    }
  }, [multisigMembers.length, minimumApproval]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 128) {
      setName(value);
      setNameCharCount(value.length);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 3 * 1024 * 1024) {
        alert('File size exceeds 3MB limit');
        return;
      }
      
      setLogo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    setLinks([...links, { id: Date.now().toString(), name: '', url: '' }]);
  };

  const updateLink = (id: string, field: 'name' | 'url', value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const addMultisigMember = () => {
    setMultisigMembers([...multisigMembers, { id: Date.now().toString(), address: '' }]);
  };

  const updateMultisigMember = (id: string, address: string) => {
    setMultisigMembers(multisigMembers.map(member => 
      member.id === id ? { ...member, address } : member
    ));
  };

  const removeMultisigMember = (id: string) => {
    setMultisigMembers(multisigMembers.filter(member => member.id !== id));
  };

  const decreaseMinimumApproval = () => {
    if (minimumApproval > 1) {
      setMinimumApproval(minimumApproval - 1);
    }
  };

  const increaseMinimumApproval = () => {
    if (minimumApproval < multisigMembers.length) {
      setMinimumApproval(minimumApproval + 1);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate first step
      if (!name.trim()) {
        alert('Please enter a DAO name');
        return;
      }
      if (!description.trim()) {
        alert('Please enter a description');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate second step
      if (multisigMembers.length === 0) {
        alert('Please add at least one multisig member');
        return;
      }
      
      // Check if any member address is empty
      const hasEmptyAddress = multisigMembers.some(member => !member.address.trim());
      if (hasEmptyAddress) {
        alert('Please fill in all member addresses');
        return;
      }
      
      // Move to summary step
      setStep(3);
    } else if (step === 3) {
      // Validate confirmation checkbox
      if (!confirmValues) {
        alert('Please confirm that the values are correct');
        return;
      }
      
      // Submit form
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would create the DAO on-chain
      // For now, we'll just simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a new DAO object
      const newDao = {
        id: `dao-${Date.now()}`,
        name,
        description,
        logo: logoPreview,
        members: multisigMembers.length,
        proposals: 0,
        treasury: [
          { amount: 0, symbol: 'SOL' }
        ]
      };
      
      // Add to DAOs list and set as current DAO
      addDao(newDao);
      setCurrentDao(newDao);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating DAO:', error);
      alert('Failed to create DAO. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate if the approval threshold might be too high
  const isThresholdTooHigh = minimumApproval === multisigMembers.length;

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <Globe className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Connect Your Wallet</h2>
          <p className="mt-2 text-sm text-gray-600">
            You need to connect your Solana wallet to create a DAO.
          </p>
          <div className="mt-6 flex justify-center">
            <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Create a DAO</h1>
          <p className="mt-2 text-lg text-gray-600">
            Set up your decentralized organization on Solana
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Progress indicator */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="font-medium">Basic Information</span>
              <span className="font-medium">Multisig Setup</span>
              <span className="font-medium">Review & Create</span>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-sm text-gray-500">Maximum of 128 characters</p>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Type your DAO's name..."
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="mt-1 text-sm text-gray-500 text-right">
                    {nameCharCount}/128
                  </div>
                </div>

                {/* Logo */}
                <div>
                  <div className="flex items-center">
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                      Logo
                    </label>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Optional
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF of no more than 3MB. We recommend 1024x1024px.</p>
                  <div className="mt-1 flex items-center">
                    {logoPreview ? (
                      <div className="relative">
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setLogo(null);
                            setLogoPreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="h-16 w-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400">
                          <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                        <input
                          id="logo-upload"
                          name="logo-upload"
                          type="file"
                          className="sr-only"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={handleLogoChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <p className="text-sm text-gray-500">
                    Describe your DAO's purpose in a few sentences. This is listed on the Explore page so new contributors can find you.
                  </p>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      rows={4}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Type your summary..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Links */}
                <div>
                  <div className="flex items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Links
                    </label>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Optional
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Links to your DAO's website, social media profiles, Discord, or other places your community gathers.
                  </p>
                  
                  {links.length > 0 && (
                    <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 grid grid-cols-2 gap-4">
                        <div className="text-sm font-medium text-gray-700">Name / Description</div>
                        <div className="text-sm font-medium text-gray-700">Link</div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {links.map((link) => (
                          <div key={link.id} className="px-4 py-3 grid grid-cols-2 gap-4 items-center">
                            <div>
                              <input
                                type="text"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Lens, Discord, etc."
                                value={link.name}
                                onChange={(e) => updateLink(link.id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="url"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="https://"
                                value={link.url}
                                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                              />
                              <button
                                type="button"
                                onClick={() => removeLink(link.id)}
                                className="ml-2 text-gray-400 hover:text-gray-500"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={addLink}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Multisig Setup */}
          {step === 2 && (
            <div className="px-4 py-5 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Multisig members</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There is no limit on the number of addresses on your multisig. Addresses can create proposals, create and approve transactions, and suggest changes to the DAO settings after creation.
                </p>
                
                <div className="mt-6 border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3">
                    <div className="text-sm font-medium text-gray-700">Address</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {multisigMembers.map((member) => (
                      <div key={member.id} className="px-4 py-3 flex items-center justify-between">
                        <input
                          type="text"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Solana wallet address"
                          value={member.address}
                          onChange={(e) => updateMultisigMember(member.id, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeMultisigMember(member.id)}
                          className="ml-2 text-gray-400 hover:text-gray-500"
                          disabled={multisigMembers.length === 1 && member.id === multisigMembers[0].id}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={addMultisigMember}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add address
                  </button>
                </div>
                
                {/* Minimum approval section */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Minimum approval</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Minimum approval is the amount of addresses in the authorized list that must approve a proposal for it to pass.
                  </p>
                  
                  <div className="mt-4">
                    <div className="text-right text-sm text-gray-700 mb-2">
                      {minimumApproval} of {multisigMembers.length} addresses
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(minimumApproval / multisigMembers.length) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={decreaseMinimumApproval}
                        disabled={minimumApproval <= 1}
                        className={`rounded-md p-2 ${
                          minimumApproval <= 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      
                      <div className="mx-4 flex-1 text-center">
                        <input
                          type="number"
                          min={1}
                          max={multisigMembers.length}
                          value={minimumApproval}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value >= 1 && value <= multisigMembers.length) {
                              setMinimumApproval(value);
                            }
                          }}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-center sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <button
                        type="button"
                        onClick={increaseMinimumApproval}
                        disabled={minimumApproval >= multisigMembers.length}
                        className={`rounded-md p-2 ${
                          minimumApproval >= multisigMembers.length 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {isThresholdTooHigh && (
                    <div className="mt-4 flex items-start text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <p>This approval threshold might be too high to reach regularly. Consider setting something lower.</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700">Summary</div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-500">Total wallets</div>
                    <div className="text-sm font-medium text-gray-900">{multisigMembers.length}</div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-500">Minimum approvals</div>
                    <div className="text-sm font-medium text-gray-900">{minimumApproval}</div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-blue-600">
                  <Info className="h-5 w-5 mr-2" />
                  <p>Your connected wallet was automatically added to the list. You can remove it if you like.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Create */}
          {step === 3 && (
            <div className="px-4 py-5 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Review your DAO</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please review all the information below before creating your DAO.
                </p>
                
                <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2">
                        <span className="text-xs font-medium">1</span>
                      </span>
                      DAO
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Basic information about your DAO.
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Logo</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {logoPreview ? (
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">{name.charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{name}</dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{description}</dd>
                      </div>
                      {links.length > 0 && (
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Links</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                              {links.map((link) => (
                                <li key={link.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div className="w-0 flex-1 flex items-center">
                                    <LinkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-2 flex-1 w-0 truncate">{link.name}</span>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">
                                      {link.url}
                                    </a>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2">
                        <span className="text-xs font-medium">2</span>
                      </span>
                      Multisig Setup
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Governance configuration for your DAO.
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Minimum Approval</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {minimumApproval} of {multisigMembers.length} addresses
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Multisig Members</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {multisigMembers.map((member, index) => (
                              <li key={member.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <span className="flex-shrink-0 h-5 w-5 text-gray-400">{index + 1}.</span>
                                  <span className="ml-2 flex-1 w-0 truncate font-mono">{formatAddress(member.address)}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center">
                  <input
                    id="confirm-values"
                    name="confirm-values"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={confirmValues}
                    onChange={(e) => setConfirmValues(e.target.checked)}
                  />
                  <label htmlFor="confirm-values" className="ml-2 block text-sm text-gray-900">
                    These values are correct
                  </label>
                </div>
                
                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Important information</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          After creating your DAO, you'll be able to manage it through the dashboard. You can add members, create proposals, and manage treasury assets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form actions */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain flex layout
            )}
            
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : step < 3 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Create DAO
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};