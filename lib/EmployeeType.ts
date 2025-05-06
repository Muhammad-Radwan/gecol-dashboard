export type userType = {
    "cardGuide": string,
    "isSynced": number,
    "employeeName": string,
    "loginId": string,
    "password": string,
    "companyGuid": string,
    "company": {
      "cardGuide": string,
      "isSynced": number,
      "companyName": string,
      "companyType": 1,
      "administrationId": number,
      "administrationName": string,
      "mainCompanyGuid": string
    },
    "isITUser": boolean,
    "vendorName": string,
    "deviceId": string,
    "isActive": boolean
  }