import {
  useAddAddressMutation,
  useGetAllCustomersQuery,
  useGetByIdCustomerAddressListQuery,
  useGetCorporateOptionsQuery,
  useGetGeoOptionsQuery,
  useGetIndividualOptionsQuery,
} from '../endpoints/customerShared.endpoints';

export function useCustomerSharedEndpoints() {
  const addCustomerAddress = useAddAddressMutation();
  const getAllCustomer = useGetAllCustomersQuery();
  const getIndividualOptions = useGetIndividualOptionsQuery();
  const getCorporateOptions = useGetCorporateOptionsQuery();
  const getByIdCustomerAddressList = (customerId: string) =>
    useGetByIdCustomerAddressListQuery(customerId!, {
      skip: !customerId,
    });
  const getCitiesAndStates = (cityId?: number) => useGetGeoOptionsQuery(cityId);

  return {
    getAllCustomer,
    getIndividualOptions,
    getCorporateOptions,
    getByIdCustomerAddressList,
    addCustomerAddress,
    getCitiesAndStates,
  };
}
