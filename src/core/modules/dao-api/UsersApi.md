# .UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](UsersApi.md#createUser) | **POST** /users/ | Create a new user
[**getUser**](UsersApi.md#getUser) | **GET** /users/{user_id} | Get an existing user
[**getUserWithWalletAddress**](UsersApi.md#getUserWithWalletAddress) | **GET** /users/{wallet_address} | Check if user with the wallet address exists
[**updateUser**](UsersApi.md#updateUser) | **PUT** /users/{user_id} | Update an existing user


# **createUser**
> UserResponse createUser(inputCreateUser)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiCreateUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiCreateUserRequest = {
  
  inputCreateUser: {
    username: "username_example",
    email: "email_example",
    password: "password_example",
    discordUsername: "discordUsername_example",
    walletAddress: "walletAddress_example",
  },
};

const data = await apiInstance.createUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inputCreateUser** | **InputCreateUser**|  |


### Return type

**UserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**201** | Infos of new user |  -  |
**400** | BadRequest |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUser**
> UserResponse getUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetUserRequest = {
  
  userId: 0,
};

const data = await apiInstance.getUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] |  | defaults to undefined


### Return type

**UserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Get one user |  -  |
**404** | NotFound |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUserWithWalletAddress**
> UserExistResponse getUserWithWalletAddress()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetUserWithWalletAddressRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetUserWithWalletAddressRequest = {
  
  walletAddress: "wallet_address_example",
};

const data = await apiInstance.getUserWithWalletAddress(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **walletAddress** | [**string**] |  | defaults to undefined


### Return type

**UserExistResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Check if user with the wallet address exists |  -  |
**404** | NotFound |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateUser**
> UserResponse updateUser(inputUpdateUser)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUpdateUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUpdateUserRequest = {
  
  userId: 0,
  
  inputUpdateUser: {
    username: "username_example",
    email: "email_example",
    password: "password_example",
    discordUsername: "discordUsername_example",
  },
};

const data = await apiInstance.updateUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inputUpdateUser** | **InputUpdateUser**|  |
 **userId** | [**number**] |  | defaults to undefined


### Return type

**UserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | Update one user |  -  |
**404** | NotFound |  -  |
**400** | BadRequest |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


