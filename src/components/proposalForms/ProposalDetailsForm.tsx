import React from 'react';
import { Plus, Trash2, LinkIcon, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  url: string;
}

interface ProposalDetailsFormProps {
  title: string;
  setTitle: (title: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  body: string;
  setBody: (body: string) => void;
  resources: Resource[];
  setResources: (resources: Resource[]) => void;
  authorAddress: string;
}

export const ProposalDetailsForm: React.FC<ProposalDetailsFormProps> = ({
  title,
  setTitle,
  summary,
  setSummary,
  body,
  setBody,
  resources,
  setResources,
  authorAddress
}) => {
  // Add resource
  const addResource = () => {
    setResources([...resources, { id: Date.now().toString(), name: '', url: '' }]);
  };

  // Update resource
  const updateResource = (id: string, field: 'name' | 'url', value: string) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, [field]: value } : resource
    ));
  };

  // Remove resource
  const removeResource = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="space-y-6">
        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <div className="mt-1 flex items-center">
            <div className="bg-blue-100 rounded-full p-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="ml-2 text-sm text-gray-900">
              You ({authorAddress.slice(0, 6)}...{authorAddress.slice(-4)})
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="title"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Give your proposal a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <div className="mt-1">
            <textarea
              id="summary"
              rows={3}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Describe your proposal in 2-3 sentences. This will appear in the proposal overview."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
        </div>

        {/* Body */}
        <div>
          <div className="flex items-center">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Optional
            </span>
          </div>
          <div className="mt-1 border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-50 px-3 py-2 flex items-center border-b border-gray-300">
              <button type="button" className="p-1 rounded hover:bg-gray-200">
                <span className="font-bold">B</span>
              </button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 ml-2">
                <span className="italic">I</span>
              </button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 ml-2">
                <LinkIcon className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 ml-2">
                <ExternalLink className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 ml-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <button type="button" className="p-1 rounded hover:bg-gray-200 ml-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
            <textarea
              id="body"
              rows={6}
              className="block w-full border-0 focus:ring-0 sm:text-sm"
              placeholder="Write the body of the proposal here."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>

        {/* Resources */}
        <div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700">
              Resources
            </label>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Optional
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Share external resources here.
          </p>
          
          {resources.length > 0 && (
            <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 grid grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-700">Name / Description</div>
                <div className="text-sm font-medium text-gray-700">Link</div>
              </div>
              <div className="divide-y divide-gray-200">
                {resources.map((resource) => (
                  <div key={resource.id} className="px-4 py-3 grid grid-cols-2 gap-4 items-center">
                    <div>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Lens, Discord, etc."
                        value={resource.name}
                        onChange={(e) => updateResource(resource.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="url"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://"
                        value={resource.url}
                        onChange={(e) => updateResource(resource.id, 'url', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeResource(resource.id)}
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
              onClick={addResource}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};