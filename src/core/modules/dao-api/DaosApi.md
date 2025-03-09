# .DaosApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**daosDaoIdAdminsDelete**](DaosApi.md#daosDaoIdAdminsDelete) | **DELETE** /daos/{dao_id}/admins | Remove an admin from a DAO
[**daosDaoIdAdminsPost**](DaosApi.md#daosDaoIdAdminsPost) | **POST** /daos/{dao_id}/admins | Add an admin to a DAO
[**daosDaoIdDelete**](DaosApi.md#daosDaoIdDelete) | **DELETE** /daos/{dao_id} | Delete a DAO
[**daosDaoIdGet**](DaosApi.md#daosDaoIdGet) | **GET** /daos/{dao_id} | Get a DAO by ID
[**daosDaoIdMembersDelete**](DaosApi.md#daosDaoIdMembersDelete) | **DELETE** /daos/{dao_id}/members | Remove a member from a DAO
[**daosDaoIdMembersPost**](DaosApi.md#daosDaoIdMembersPost) | **POST** /daos/{dao_id}/members | Add a member to a DAO
[**daosDaoIdPodsGet**](DaosApi.md#daosDaoIdPodsGet) | **GET** /daos/{dao_id}/pods | Get all PODs for a DAO
[**daosDaoIdPodsPodIdDelete**](DaosApi.md#daosDaoIdPodsPodIdDelete) | **DELETE** /daos/{dao_id}/pods/{pod_id} | Delete a POD
[**daosDaoIdPodsPodIdGet**](DaosApi.md#daosDaoIdPodsPodIdGet) | **GET** /daos/{dao_id}/pods/{pod_id} | Get a POD by ID
[**daosDaoIdPodsPodIdMembersDelete**](DaosApi.md#daosDaoIdPodsPodIdMembersDelete) | **DELETE** /daos/{dao_id}/pods/{pod_id}/members | Remove a member from a POD
[**daosDaoIdPodsPodIdMembersGet**](DaosApi.md#daosDaoIdPodsPodIdMembersGet) | **GET** /daos/{dao_id}/pods/{pod_id}/members | Get all members of a POD
[**daosDaoIdPodsPodIdMembersPost**](DaosApi.md#daosDaoIdPodsPodIdMembersPost) | **POST** /daos/{dao_id}/pods/{pod_id}/members | Add a member to a POD
[**daosDaoIdPodsPodIdPut**](DaosApi.md#daosDaoIdPodsPodIdPut) | **PUT** /daos/{dao_id}/pods/{pod_id} | Update a POD
[**daosDaoIdPodsPost**](DaosApi.md#daosDaoIdPodsPost) | **POST** /daos/{dao_id}/pods | Create a new POD
[**daosDaoIdPut**](DaosApi.md#daosDaoIdPut) | **PUT** /daos/{dao_id} | Update a DAO
[**daosDaoNameGet**](DaosApi.md#daosDaoNameGet) | **GET** /daos/{dao_name} | Get a DAO by name
[**daosGet**](DaosApi.md#daosGet) | **GET** /daos/ | List all DAOs
[**daosPost**](DaosApi.md#daosPost) | **POST** /daos/ | Create a new DAO


# **daosDaoIdAdminsDelete**
> DAO daosDaoIdAdminsDelete(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdAdminsDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdAdminsDeleteRequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdAdminsDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dAOMembership** | **DAOMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdAdminsPost**
> DAO daosDaoIdAdminsPost(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdAdminsPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdAdminsPostRequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdAdminsPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dAOMembership** | **DAOMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdDelete**
> void daosDaoIdDelete(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdDeleteRequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dAOMembership** | **DAOMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdGet**
> DAO daosDaoIdGet()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdGetRequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.daosDaoIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdMembersDelete**
> DAO daosDaoIdMembersDelete(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdMembersDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdMembersDeleteRequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdMembersDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dAOMembership** | **DAOMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdMembersPost**
> DAO daosDaoIdMembersPost(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdMembersPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdMembersPostRequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdMembersPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dAOMembership** | **DAOMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsGet**
> Array<POD> daosDaoIdPodsGet(pODUserWhoMadeRequest)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsGetRequest = {
  
  daoId: "dao_id_example",
  
  pODUserWhoMadeRequest: {
    userWhoMadeRequest: "userWhoMadeRequest_example",
  },
};

const data = await apiInstance.daosDaoIdPodsGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pODUserWhoMadeRequest** | **PODUserWhoMadeRequest**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**Array<POD>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsPodIdDelete**
> POD daosDaoIdPodsPodIdDelete(pODMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsPodIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsPodIdDeleteRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
  
  pODMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdPodsPodIdDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pODMembership** | **PODMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined
 **podId** | [**string**] |  | defaults to undefined


### Return type

**POD**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsPodIdGet**
> POD daosDaoIdPodsPodIdGet()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsPodIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsPodIdGetRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
};

const data = await apiInstance.daosDaoIdPodsPodIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined
 **podId** | [**string**] |  | defaults to undefined


### Return type

**POD**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsPodIdMembersDelete**
> POD daosDaoIdPodsPodIdMembersDelete(pODMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsPodIdMembersDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsPodIdMembersDeleteRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
  
  pODMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdPodsPodIdMembersDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pODMembership** | **PODMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined
 **podId** | [**string**] |  | defaults to undefined


### Return type

**POD**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsPodIdMembersGet**
> Array<User> daosDaoIdPodsPodIdMembersGet()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsPodIdMembersGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsPodIdMembersGetRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
};

const data = await apiInstance.daosDaoIdPodsPodIdMembersGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined
 **podId** | [**string**] |  | defaults to undefined


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsPodIdMembersPost**
> POD daosDaoIdPodsPodIdMembersPost(pODMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsPodIdMembersPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsPodIdMembersPostRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
  
  pODMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.daosDaoIdPodsPodIdMembersPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pODMembership** | **PODMembership**|  |
 **daoId** | [**string**] |  | defaults to undefined
 **podId** | [**string**] |  | defaults to undefined


### Return type

**POD**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsPodIdPut**
> POD daosDaoIdPodsPodIdPut(pODUpdate)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsPodIdPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsPodIdPutRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
  
  pODUpdate: {
    name: "name_example",
    description: "description_example",
    isActive: true,
    userWhoMadeRequest: "userWhoMadeRequest_example",
  },
};

const data = await apiInstance.daosDaoIdPodsPodIdPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pODUpdate** | **PODUpdate**|  |
 **daoId** | [**string**] |  | defaults to undefined
 **podId** | [**string**] |  | defaults to undefined


### Return type

**POD**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPodsPost**
> POD daosDaoIdPodsPost(POD)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPodsPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPodsPostRequest = {
  
  daoId: "dao_id_example",
  
  POD: {
    daoId: "daoId_example",
    name: "name_example",
    description: "description_example",
    userWhoMadeRequest: "userWhoMadeRequest_example",
  },
};

const data = await apiInstance.daosDaoIdPodsPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **POD** | **POD**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**POD**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**201** | Created |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoIdPut**
> DAO daosDaoIdPut(dAOUpdate)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoIdPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoIdPutRequest = {
  
  daoId: "dao_id_example",
  
  dAOUpdate: {
    name: "name_example",
    description: "description_example",
    isActive: true,
    userWhoMadeRequest: "userWhoMadeRequest_example",
  },
};

const data = await apiInstance.daosDaoIdPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dAOUpdate** | **DAOUpdate**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosDaoNameGet**
> DAO daosDaoNameGet()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosDaoNameGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosDaoNameGetRequest = {
  
  daoName: "dao_name_example",
};

const data = await apiInstance.daosDaoNameGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoName** | [**string**] |  | defaults to undefined


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosGet**
> Array<DAO> daosGet()


### Example


```typescript
import { createConfiguration, DaosApi } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request = {};

const data = await apiInstance.daosGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<DAO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **daosPost**
> DAO daosPost(DAO)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDaosPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDaosPostRequest = {
  
  DAO: {
    name: "name_example",
    description: "description_example",
    ownerId: "ownerId_example",
    isActive: true,
    userWhoMadeRequest: "userWhoMadeRequest_example",
  },
};

const data = await apiInstance.daosPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **DAO** | **DAO**|  |


### Return type

**DAO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**201** | Created |  -  |
**400** | Bad Request |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


