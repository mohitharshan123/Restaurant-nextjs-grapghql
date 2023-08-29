import { useMutation, useQuery } from "react-query";
//@ts-ignore
import { prop } from "ramda";

import { queryClient, QUERY_KEYS } from "../../queryClient";

import { getSettings, updateSettings } from "../../../server/utils/api";
import { Exact, UpdateSettingsInput } from "generated/graphql";


export const useGetSettings = () =>
    useQuery([QUERY_KEYS.settings], () => getSettings(), {
        select: prop("settings"),
    });

export const useUpdateSettings = () =>
    useMutation((settings: Exact<{ input: UpdateSettingsInput }>) =>
        updateSettings(settings),
        { onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.settings]) })
