import client from "@/api/client";
import { RegisterGroupRepository } from "@/repository/registerGroup.repository";

export const getGroups = async ({
  page = 1,
  size = 20,
}: {
  page: number;
  size?: number;
}) => {
  const searchParams = new URLSearchParams({
    page: page + "",
    size: size + "",
  });
  return await client.get<{ items: any[] }>("/v1/client/group?" + searchParams);
};

export const registerGroup = async (body: RegisterGroupRepository) => {
  return await client.post("/v1/client/group", body);
};
