import { useGetAllEmployeesQuery, useGetAllTeamsQuery } from '../endpoints/staffShared.endpoints';

export function useStaffSharedEndpoints() {
  const getAllEmployees = useGetAllEmployeesQuery();
  const getAllTeams = useGetAllTeamsQuery();

  return {
    getAllEmployees,
    getAllTeams,
  };
}
