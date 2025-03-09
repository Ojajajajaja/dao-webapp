# .DaosApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAdminToDAO**](DaosApi.md#addAdminToDAO) | **POST** /daos/{dao_id}/admins | Add an admin to a DAO
[**addMemberToDAO**](DaosApi.md#addMemberToDAO) | **POST** /daos/{dao_id}/members | Add a member to a DAO
[**addMemberToPOD**](DaosApi.md#addMemberToPOD) | **POST** /daos/{dao_id}/pods/{pod_id}/members | Add a member to a POD
[**createDAO**](DaosApi.md#createDAO) | **POST** /daos/ | Create a new DAO
[**createPOD**](DaosApi.md#createPOD) | **POST** /daos/{dao_id}/pods | Create a new POD
[**deleteDAO**](DaosApi.md#deleteDAO) | **DELETE** /daos/{dao_id} | Delete a DAO
[**deletePOD**](DaosApi.md#deletePOD) | **DELETE** /daos/{dao_id}/pods/{pod_id} | Delete a POD
[**getAllDAOs**](DaosApi.md#getAllDAOs) | **GET** /daos/ | List all DAOs
[**getAllMembersOfPOD**](DaosApi.md#getAllMembersOfPOD) | **GET** /daos/{dao_id}/pods/{pod_id}/members | Get all members of a POD
[**getAllPODsForDAO**](DaosApi.md#getAllPODsForDAO) | **GET** /daos/{dao_id}/pods | Get all PODs for a DAO
[**getDAOById**](DaosApi.md#getDAOById) | **GET** /daos/{dao_id} | Get a DAO by ID
[**getPODById**](DaosApi.md#getPODById) | **GET** /daos/{dao_id}/pods/{pod_id} | Get a POD by ID
[**removeAdminFromDAO**](DaosApi.md#removeAdminFromDAO) | **DELETE** /daos/{dao_id}/admins | Remove an admin from a DAO
[**removeMemberFromDAO**](DaosApi.md#removeMemberFromDAO) | **DELETE** /daos/{dao_id}/members | Remove a member from a DAO
[**removeMemberFromPOD**](DaosApi.md#removeMemberFromPOD) | **DELETE** /daos/{dao_id}/pods/{pod_id}/members | Remove a member from a POD
[**updateDAO**](DaosApi.md#updateDAO) | **PUT** /daos/{dao_id} | Update a DAO
[**updatePOD**](DaosApi.md#updatePOD) | **PUT** /daos/{dao_id}/pods/{pod_id} | Update a POD


# **addAdminToDAO**
> DAO addAdminToDAO(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiAddAdminToDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiAddAdminToDAORequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.addAdminToDAO(request);
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

# **addMemberToDAO**
> DAO addMemberToDAO()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiAddMemberToDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiAddMemberToDAORequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.addMemberToDAO(request);
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
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **addMemberToPOD**
> POD addMemberToPOD()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiAddMemberToPODRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiAddMemberToPODRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
};

const data = await apiInstance.addMemberToPOD(request);
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
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createDAO**
> DAO createDAO(DAO)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiCreateDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiCreateDAORequest = {
  
  DAO: {
    name: "name_example",
    description: "description_example",
    ownerId: "ownerId_example",
    isActive: true,
  },
};

const data = await apiInstance.createDAO(request);
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

# **createPOD**
> POD createPOD(POD)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiCreatePODRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiCreatePODRequest = {
  
  daoId: "dao_id_example",
  
  POD: {
    daoId: "daoId_example",
    name: "name_example",
    description: "description_example",
  },
};

const data = await apiInstance.createPOD(request);
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

# **deleteDAO**
> void deleteDAO()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDeleteDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDeleteDAORequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.deleteDAO(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deletePOD**
> POD deletePOD()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiDeletePODRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiDeletePODRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
};

const data = await apiInstance.deletePOD(request);
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
**400** | Bad Request |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllDAOs**
> Array<DAO> getAllDAOs()


### Example


```typescript
import { createConfiguration, DaosApi } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request = {};

const data = await apiInstance.getAllDAOs(request);
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

# **getAllMembersOfPOD**
> Array<User> getAllMembersOfPOD()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiGetAllMembersOfPODRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiGetAllMembersOfPODRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
};

const data = await apiInstance.getAllMembersOfPOD(request);
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

# **getAllPODsForDAO**
> Array<POD> getAllPODsForDAO()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiGetAllPODsForDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiGetAllPODsForDAORequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.getAllPODsForDAO(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**Array<POD>**

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

# **getDAOById**
> DAO getDAOById()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiGetDAOByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiGetDAOByIdRequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.getDAOById(request);
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

# **getPODById**
> POD getPODById()


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiGetPODByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiGetPODByIdRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
};

const data = await apiInstance.getPODById(request);
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

# **removeAdminFromDAO**
> DAO removeAdminFromDAO(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiRemoveAdminFromDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiRemoveAdminFromDAORequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.removeAdminFromDAO(request);
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

# **removeMemberFromDAO**
> DAO removeMemberFromDAO(dAOMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiRemoveMemberFromDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiRemoveMemberFromDAORequest = {
  
  daoId: "dao_id_example",
  
  dAOMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.removeMemberFromDAO(request);
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

# **removeMemberFromPOD**
> POD removeMemberFromPOD(pODMembership)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiRemoveMemberFromPODRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiRemoveMemberFromPODRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
  
  pODMembership: {
    userId: "userId_example",
  },
};

const data = await apiInstance.removeMemberFromPOD(request);
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

# **updateDAO**
> DAO updateDAO(dAOUpdate)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiUpdateDAORequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiUpdateDAORequest = {
  
  daoId: "dao_id_example",
  
  dAOUpdate: {
    name: "name_example",
    description: "description_example",
    isActive: true,
  },
};

const data = await apiInstance.updateDAO(request);
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

# **updatePOD**
> POD updatePOD(pODUpdate)


### Example


```typescript
import { createConfiguration, DaosApi } from '';
import type { DaosApiUpdatePODRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DaosApi(configuration);

const request: DaosApiUpdatePODRequest = {
  
  daoId: "dao_id_example",
  
  podId: "pod_id_example",
  
  pODUpdate: {
    name: "name_example",
    description: "description_example",
    isActive: true,
  },
};

const data = await apiInstance.updatePOD(request);
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


