# .TreasuryApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDAOTransfer**](TreasuryApi.md#createDAOTransfer) | **POST** /treasury/daos/{dao_id}/transfers | Create a new transfer for a specific DAO
[**createToken**](TreasuryApi.md#createToken) | **POST** /treasury/daos/{dao_id}/tokens | Create a new token for a specific DAO
[**getDAOTokens**](TreasuryApi.md#getDAOTokens) | **GET** /treasury/daos/{dao_id}/tokens | Get all tokens for a specific DAO
[**getDAOTransfers**](TreasuryApi.md#getDAOTransfers) | **GET** /treasury/daos/{dao_id}/transfers | Get all transfers for a specific DAO
[**getDAOTreasury**](TreasuryApi.md#getDAOTreasury) | **GET** /treasury/daos/{dao_id} | Get Treasury information for a specific DAO
[**updateDAOTokenPercentages**](TreasuryApi.md#updateDAOTokenPercentages) | **PUT** /treasury/daos/{dao_id}/update-percentages | Update the percentages of tokens in the DAO\&#39;s treasury without changing prices


# **createDAOTransfer**
> TransferSchemaResponse createDAOTransfer(transferCreate)


### Example


```typescript
import { createConfiguration, TreasuryApi } from '';
import type { TreasuryApiCreateDAOTransferRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TreasuryApi(configuration);

const request: TreasuryApiCreateDAOTransferRequest = {
  
  daoId: "dao_id_example",
  
  transferCreate: {
    daoId: "daoId_example",
    tokenId: "tokenId_example",
    fromAddress: "fromAddress_example",
    toAddress: "toAddress_example",
    amount: 3.14,
    timestamp: new Date('1970-01-01T00:00:00.00Z'),
  },
};

const data = await apiInstance.createDAOTransfer(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferCreate** | **TransferCreate**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**TransferSchemaResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**201** | Transfer created successfully |  -  |
**401** | Unauthorized |  -  |
**404** | DAO not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createToken**
> TokenSchemaResponse createToken(tokenCreate)


### Example


```typescript
import { createConfiguration, TreasuryApi } from '';
import type { TreasuryApiCreateTokenRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TreasuryApi(configuration);

const request: TreasuryApiCreateTokenRequest = {
  
  daoId: "dao_id_example",
  
  tokenCreate: {
    daoId: "daoId_example",
    name: "name_example",
    symbol: "symbol_example",
    contract: "contract_example",
    amount: 3.14,
  },
};

const data = await apiInstance.createToken(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tokenCreate** | **TokenCreate**|  |
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**TokenSchemaResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**201** | Token created successfully |  -  |
**400** | Bad Request |  -  |
**404** | DAO not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDAOTokens**
> Array<Token> getDAOTokens()


### Example


```typescript
import { createConfiguration, TreasuryApi } from '';
import type { TreasuryApiGetDAOTokensRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TreasuryApi(configuration);

const request: TreasuryApiGetDAOTokensRequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.getDAOTokens(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**Array<Token>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of all tokens for the DAO |  -  |
**404** | DAO not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDAOTransfers**
> Array<Transfer> getDAOTransfers()


### Example


```typescript
import { createConfiguration, TreasuryApi } from '';
import type { TreasuryApiGetDAOTransfersRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TreasuryApi(configuration);

const request: TreasuryApiGetDAOTransfersRequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.getDAOTransfers(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**Array<Transfer>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of all transfers for the DAO |  -  |
**404** | DAO not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDAOTreasury**
> Treasury getDAOTreasury()


### Example


```typescript
import { createConfiguration, TreasuryApi } from '';
import type { TreasuryApiGetDAOTreasuryRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TreasuryApi(configuration);

const request: TreasuryApiGetDAOTreasuryRequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.getDAOTreasury(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**Treasury**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Treasury information for a specific DAO |  -  |
**404** | DAO not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateDAOTokenPercentages**
> TreasuryUpdatePercentages updateDAOTokenPercentages()


### Example


```typescript
import { createConfiguration, TreasuryApi } from '';
import type { TreasuryApiUpdateDAOTokenPercentagesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TreasuryApi(configuration);

const request: TreasuryApiUpdateDAOTokenPercentagesRequest = {
  
  daoId: "dao_id_example",
};

const data = await apiInstance.updateDAOTokenPercentages(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **daoId** | [**string**] |  | defaults to undefined


### Return type

**TreasuryUpdatePercentages**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Token percentages updated successfully |  -  |
**400** | Bad Request - Error updating token percentages |  -  |
**401** | Unauthorized - Invalid or missing token |  -  |
**404** | DAO not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


