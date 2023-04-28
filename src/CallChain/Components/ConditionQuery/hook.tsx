import { SelectProps } from "@fd/react";
import { useState, useEffect } from "react";
import { SelectorHookType,formatStringListToOptions } from "../../hook";
import { useQueryTraceTag } from "../../crud";
import { debounce } from "lodash";

export function useTagKeyItemSelector() :SelectorHookType {
    const { data,setTraceTag } = useQueryTraceTag();
    const [tagKeyItemIdList, setTagKeyItemIdList] = useState<SelectProps['options']>([]);

    /**
     * 根据当前输入的sessionId做模糊搜索，刷新options
     */
    const setSearchTagKeyItemId = debounce(setTraceTag, 400);

    useEffect(() => {
        setTagKeyItemIdList(data?.map(formatStringListToOptions));
    }, [data]);

    return [setSearchTagKeyItemId, tagKeyItemIdList];
}