export enum ErrorCode {
  E999999 = 999999, // Other exception
  E999422 = 999422, // Validator invalid
  E999401 = 999401, // Unauthorized
  E999404 = 999404, // URL API invalid
  E999405 = 999405, // URL API invalid
  E100001 = 100001,
  E100002 = 100002,
  E100999 = 100999,
  // Authenticate
  E101001 = 101001,
  E101002 = 101002,
  E101003 = 101003,
  E101004 = 101004,
  E101005 = 101005,

  //User
  E110000 = 110000,
  E110001 = 110001, // User not Found



  // Inspection type
  E111000 = 111000, //Inspection type does not exist
  E111001 = 111001, // Inspection type with company_code and inspection_code is exist
  E111002 = 111002, // Combine type is exist
  E111003 = 111003, // Multi inspection type with id is not found
  E111004 = 111004, // Không the cap nhat inspection_type_item

  // Inspection result code
  E112000 = 112000, //Inspection result code does not exist
  E112001 = 112001, // Inspection result code has already exists

  // Tab
  E113000 = 113000, // Tab không tồn tại.
  E113099 = 113099, // Loi exception xoa trong CSDL (DB exception)

  // Inspection schedule result
  E115000 = 115000, // The inspection schedule result not found

  // Inspector
  E120001 = 120001, // Inspector invalid
  E120002 = 120002, // Inspector does not exist
  E120003 = 120003, // Inspector schedules invalid query params

  // Site
  E130000 = 130000, // Site does not exist
  E130001 = 130001, // Site has already exists
  E131000 = 131000, // Site_Inspection_Type does not exist
  E132000 = 132000, // date_specified_type_exception_days does not exist
  E132001 = 132001, // date_specified_type_exception_days has already exists
  // USER
  E102000 = 102000, // User does not exist
  E102001 = 102001, // User has already exists
  E102002 = 102002, // Email has already exists
  E102003 = 102003, // User Role invalid
  E102004 = 102004, // Password do not match
  E102005 = 102005, // The user code has already exists

  //ROLE
  E103000 = 103000, // Role does not exist
  E103002 = 103002, // Role invalid

  // MST Reason
  E140000 = 140000, // MST Reason does not exist
  E140001 = 140001, // MST Reason has already exists
  //Master Programs
  E105000 = 105000, // Program does not exist

  // Inspection type comment
  E150000 = 150000, // MST Reason does not exist
  E150001 = 150001, // MST Reason has already exists

  // MST Car Body Type
  E160000 = 160000, // MST Car Body Type does not exist
  E160001 = 160001, // MST Car Body Type has already exists

  // File
  E170000 = 170000, // File invalid
  E170001 = 170001, // File upload error

  // System(generic code, parameter,...)
  E201000 = 201000, // System invalid
  E201001 = 201001, // System invalid
  E201002 = 201002, // Generic code does not exist
  E201003 = 201003, // Parameter does not exist
  E201004 = 201004, // Language label does not exist
  E201005 = 201005, // Generic code is exist

  E203001 = 203001, // System common-exception-day data has already existed
  E203002 = 203002, // System common-exception-day data not found
  E203003 = 203003, // System common-exception-day invalid request data

  // Mail template
  E104000 = 104000, // Mail templates doest not exists
  E104001 = 104001, // Mail templates has already exists

  //Inspection schedule result
  E301000 = 301000, // order_number in INS_Schedule_Result does not exist
  E301001 = 301001, // INS_Schedule_Result does not exist
  E301002 = 301002, // cannot update inspection_result after approved
  E301003 = 301003, // cannot permission set approve inspection
  E301004 = 301004, // not the onwer of inspection schedule result
  E301005 = 301005, // ins_result invalid
  E301006 = 301006, // cannot update inspection schedule result with inspector_assigned
  E301007 = 301007, // standard working time does not exists

  // Barcode
  E202001 = 202001, // barcode is linked with other identification number earlier
  E202002 = 202002, // identification number is with other barcode linked earlier

  // Notification
  E303000 = 303000, // Notification doest not exists
  E303001 = 303001, // Notification has already exists
  E303002 = 303002, // Notification can not be updated

  //NotificationUser
  E304000 = 304000, // Notification doest not exists
  E304001 = 304001, // Notification has already exists

  E401000 = 401000, // Site's time exception day does not exist
  E401001 = 401001, // Site's time exception day data invalid

  //ERP
  E302000 = 302000, // tranid doest not exists
}
