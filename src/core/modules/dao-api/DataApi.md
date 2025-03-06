# .DataApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getItems**](DataApi.md#getItems) | **GET** /data/items | Get data
[**getSummary**](DataApi.md#getSummary) | **GET** /data/summary | Get data


# **getItems**
> ItemsResponse getItems()


### Example


```typescript
import { createConfiguration, DataApi } from '';
import type { DataApiGetItemsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DataApi(configuration);

const request: DataApiGetItemsRequest = {
  
  dateStart: "date_start_example",
  
  dateEnd: "date_end_example",
  
  source: "source_example",
};

const data = await apiInstance.getItems(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dateStart** | [**string**] |  | defaults to undefined
 **dateEnd** | [**string**] |  | defaults to undefined
 **source** | [**string**] |  | (optional) defaults to undefined


### Return type

**ItemsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | BadRequest |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getSummary**
> SummaryResponse getSummary()


### Example


```typescript
import { createConfiguration, DataApi } from '';
import type { DataApiGetSummaryRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DataApi(configuration);

const request: DataApiGetSummaryRequest = {
  
  dateStart: "date_start_example",
  
  dateEnd: "date_end_example",
  
  source: "source_example",
};

const data = await apiInstance.getSummary(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dateStart** | [**string**] |  | defaults to undefined
 **dateEnd** | [**string**] |  | defaults to undefined
 **source** | [**string**] |  | (optional) defaults to undefined


### Return type

**SummaryResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | OK |  -  |
**400** | BadRequest |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


