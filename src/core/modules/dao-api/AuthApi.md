# .AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getWalletChallenge**](AuthApi.md#getWalletChallenge) | **POST** /auth/wallet/challenge | Generate a challenge message for Solana wallet signature authentication
[**logout**](AuthApi.md#logout) | **POST** /auth/logout | Logout the user
[**verifyWalletSignature**](AuthApi.md#verifyWalletSignature) | **POST** /auth/wallet/verify | Verify a Solana wallet signature and authenticate the user


# **getWalletChallenge**
> ChallengeResponse getWalletChallenge(challengeRequest)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiGetWalletChallengeRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiGetWalletChallengeRequest = {
  
  challengeRequest: {
    walletAddress: "walletAddress_example",
  },
};

const data = await apiInstance.getWalletChallenge(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **challengeRequest** | **ChallengeRequest**|  |


### Return type

**ChallengeResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | Challenge message |  -  |
**404** | User not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **logout**
> LogoutResponse logout()


### Example


```typescript
import { createConfiguration, AuthApi } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request = {};

const data = await apiInstance.logout(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**LogoutResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Logout the user |  -  |
**401** | Not logged |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **verifyWalletSignature**
> LoginResponse verifyWalletSignature(verifySignature)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiVerifyWalletSignatureRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiVerifyWalletSignatureRequest = {
  
  verifySignature: {
    walletAddress: "walletAddress_example",
    signature: "signature_example",
  },
};

const data = await apiInstance.verifyWalletSignature(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **verifySignature** | **VerifySignature**|  |


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**201** | Login successful |  -  |
**401** | Invalid signature |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


