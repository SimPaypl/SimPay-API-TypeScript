# node-simpay-api

## SMS
### Weryfikacja kodu
```typescript
sms: Sms = new Sms();
sms: Sms = new Sms('key','secret');

request: CodeVerifyRequest = new CodeVerifyRequest();
request.code = 'code';
request.key = 'key'; // can be omitted  by passing value in constructor
request.secret ='secret'; // can be omitted  by passing value in constructor
request.number = 'number';
request.service_id = 'service_id';

response: APIResponse<CodeVerifyResponse> = sms.verifyCode(request);
error: string[] = response.error; // List of errors, if request was successful list will be empty
codeVerifyResponse: CodeVerifyResponse = response.respond;
from: string = codeVerifyResponse.from; // Sender number
number: number = codeVerifyResponse.number; // Number where sms were sent
status: string = codeVerifyResponse.status; // Status received from api
test: number = codeVerifyResponse.test; // 1 if sms was test else 0
value: number = codeVerifyResponse.value; // Code Value
```

### Pobieranie listy usług
```typescript
sms: Sms = new Sms();
sms: Sms = new Sms('key','secret');


request: ServiceListRequest = new ServiceListRequest();
request.key = 'key';
request.secret = 'secret';
response: APIResponse<ServicesResponse> = sms.getServiceList(request);
error: string[] = response.error; // List of errors, if request was successful list will be empty
serviceList: ServicesResponse = response.respond;
status: string = serviceList.status; // Status received from api
services: Service[] = serviceList.services; // List of services
```

## SMS XML
```typescript
smsXml: SmsXml = new SmsXml('apikey');
code: string = smsXml.generateCode(); // Generate code
number: number = smsXml.getSmsValue('number'); // retrieve information's about sms
sms: string = smsXml.generateXml('sms'); // Generate xml from sms message
ip: boolean = smsXml.getServersIp('ip'); // Check if passed ip is valid ip of simpay servers
```

## Direct Billing
### Generowanie transakcji
```typescript
directBilling: DirectBilling = new DirectBilling();
directBilling: DirectBilling = new DirectBilling('apiKey', 'secret', false, '1');

request: DbGenerateRequest = new DbGenerateRequest();
request.amount = 'amount';
request.amount_gross = 'amount_gross';
request.amount_required = 'amount_required';
request.complete = 'complete';
request.failure = 'failure';
request.provider = Operator.ORANGE; // orange, play, t-mobile, plus-gsm
request.control = 'control';
request.serviceId = '1';

dbGenerateResponse: DbGenerateResponse = directBilling.generateTransaction(request);
dbGenerateResponse.link; // Link
dbGenerateResponse.name; // Transaction Name
dbGenerateResponse.status; // Status received from api
```

### Pobieranie danych o transakcji
```typescript
directBilling: DirectBilling  = new DirectBilling();
directBilling: DirectBilling  = new DirectBilling('apiKey', 'secret', false, '1');

request: DbTransactionRequest = new DbTransactionRequest();
request.id = 1;
request.key = 'key'; // can be omitted  by passing value in constructor
request.secret = 'secret';  // can be omitted  by passing value in constructor

response: APIResponse<DbTransaction>  = directBilling.getTransaction(request);
error: string[] = response.error; // List of errors, if request was successful list will be empty
respond: DbTransaction = response.respond;
```

### Pobieranie listy usług DCB
```typescript
directBilling: DirectBilling  = new DirectBilling();
directBilling: DirectBilling  = new DirectBilling('apiKey', 'secret', false, '1');

request: DbServicesListRequest = new DbServicesListRequest();
request.api = 'key'; // can be omitted  by passing value in constructor
request.secret = 'secret';  // can be omitted  by passing value in constructor

response: APIResponse<DbServicesListResponse> = directBilling.getServices(request);
error: string[] = response.error; // List of errors, if request was successful list will be empty
respond: DbTransaction = response.respond;
```

### Pobieranie maksymalnych kwot transakcji
```typescript
directBilling: DirectBilling = new DirectBilling();
directBilling: DirectBilling = new DirectBilling('apiKey', 'secret', false, '1');

request: DbTransactionLimitsRequest = new DbTransactionLimitsRequest();
request.service_id = '1';
request.api = 'key'; // can be omitted  by passing value in constructor
request.secret = 'secret';  // can be omitted  by passing value in constructor

response: APIResponse<LDbTransactionLimit[]> = directBilling.getTransactionLimits(request);
```

### Pobieranie prowizji dla usługi
```typescript
directBilling: DirectBilling = new DirectBilling();
directBilling: DirectBilling = new DirectBilling('apiKey', 'secret', false, '1');

request: DbServiceCommissionRequest = new DbServiceCommissionRequest();
request.service_id = '1';
request.api = 'key'; // can be omitted  by passing value in constructor
request.secret = 'secret';  // can be omitted  by passing value in constructor

response: DbCommission[] = directBilling.getServiceCommission(request);
```

### Pobieranie adresów IP serwerów SimPay
```typescript
directBilling: DirectBilling = new DirectBilling();

response: string[] = directBilling.getServersIp();
```

### Obliczanie podpisu sign
```typescript
directBilling: DirectBilling = new DirectBilling();

sign: string = directBilling.sign(id: number, status: string, valuenet: string, valuepartner: string, control: string);
```
