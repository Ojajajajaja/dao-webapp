# .DiscordApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDiscordChannel**](DiscordApi.md#createDiscordChannel) | **POST** /discord/channels | Create a new Discord channel in the system
[**deleteDiscordChannel**](DiscordApi.md#deleteDiscordChannel) | **DELETE** /discord/channels/{channel_id} | Delete a Discord channel
[**getAllDiscordChannels**](DiscordApi.md#getAllDiscordChannels) | **GET** /discord/channels | Get all Discord channels
[**getDiscordChannel**](DiscordApi.md#getDiscordChannel) | **GET** /discord/channels/{channel_id} | Get a specific Discord channel
[**getUnlinkedDiscordChannels**](DiscordApi.md#getUnlinkedDiscordChannels) | **GET** /discord/channels/unlinked | Get all Discord channels that are not linked to any POD
[**updateDiscordChannel**](DiscordApi.md#updateDiscordChannel) | **PUT** /discord/channels/{channel_id} | Update a Discord channel


# **createDiscordChannel**
> DiscordChannelResponse createDiscordChannel(createDiscordChannel)


### Example


```typescript
import { createConfiguration, DiscordApi } from '';
import type { DiscordApiCreateDiscordChannelRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordApi(configuration);

const request: DiscordApiCreateDiscordChannelRequest = {
  
  createDiscordChannel: {
    channelId: "channelId_example",
    name: "name_example",
    podId: "podId_example",
  },
};

const data = await apiInstance.createDiscordChannel(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createDiscordChannel** | **CreateDiscordChannel**|  |


### Return type

**DiscordChannelResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**201** | Discord channel created successfully |  -  |
**400** | Bad Request - Invalid data |  -  |
**401** | Unauthorized - Invalid or missing token |  -  |
**404** | User not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteDiscordChannel**
> DiscordChannelResponse deleteDiscordChannel()


### Example


```typescript
import { createConfiguration, DiscordApi } from '';
import type { DiscordApiDeleteDiscordChannelRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordApi(configuration);

const request: DiscordApiDeleteDiscordChannelRequest = {
  
  channelId: "channel_id_example",
};

const data = await apiInstance.deleteDiscordChannel(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **channelId** | [**string**] |  | defaults to undefined


### Return type

**DiscordChannelResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Discord channel deleted successfully |  -  |
**400** | Bad Request - Error deleting channel |  -  |
**401** | Unauthorized - Invalid or missing token |  -  |
**404** | User or Discord channel not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllDiscordChannels**
> DiscordChannelsResponse getAllDiscordChannels()


### Example


```typescript
import { createConfiguration, DiscordApi } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordApi(configuration);

const request = {};

const data = await apiInstance.getAllDiscordChannels(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**DiscordChannelsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Discord channels retrieved successfully |  -  |
**401** | Unauthorized - Invalid or missing token |  -  |
**404** | User not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDiscordChannel**
> DiscordChannelResponse getDiscordChannel()


### Example


```typescript
import { createConfiguration, DiscordApi } from '';
import type { DiscordApiGetDiscordChannelRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordApi(configuration);

const request: DiscordApiGetDiscordChannelRequest = {
  
  channelId: "channel_id_example",
};

const data = await apiInstance.getDiscordChannel(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **channelId** | [**string**] |  | defaults to undefined


### Return type

**DiscordChannelResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Discord channel retrieved successfully |  -  |
**401** | Unauthorized - Invalid or missing token |  -  |
**404** | User or Discord channel not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUnlinkedDiscordChannels**
> DiscordChannelsResponse getUnlinkedDiscordChannels()


### Example


```typescript
import { createConfiguration, DiscordApi } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordApi(configuration);

const request = {};

const data = await apiInstance.getUnlinkedDiscordChannels(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**DiscordChannelsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Unlinked Discord channels retrieved successfully |  -  |
**401** | Unauthorized - Invalid or missing token |  -  |
**404** | User not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateDiscordChannel**
> DiscordChannelResponse updateDiscordChannel(updateDiscordChannel)


### Example


```typescript
import { createConfiguration, DiscordApi } from '';
import type { DiscordApiUpdateDiscordChannelRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DiscordApi(configuration);

const request: DiscordApiUpdateDiscordChannelRequest = {
  
  channelId: "channel_id_example",
  
  updateDiscordChannel: {
    name: "name_example",
    podId: "podId_example",
  },
};

const data = await apiInstance.updateDiscordChannel(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateDiscordChannel** | **UpdateDiscordChannel**|  |
 **channelId** | [**string**] |  | defaults to undefined


### Return type

**DiscordChannelResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**422** | Unprocessable Entity |  -  |
**200** | Discord channel updated successfully |  -  |
**400** | Bad Request - Invalid data |  -  |
**401** | Unauthorized - Invalid or missing token |  -  |
**404** | User or Discord channel not found |  -  |
**0** | Default error response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


