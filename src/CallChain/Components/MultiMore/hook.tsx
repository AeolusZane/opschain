import { SearchOutlined } from "@ant-design/icons";
import { Checkbox, Input, MenuProps, SelectProps } from "@fd/react";
import { useQueryTraceTagKey } from "../../crud";
import { useEffect, useState } from "react";
import { DebouncedFunc, debounce } from "lodash";
import { tagKeysAtom, tagsAtom } from "../../atom";
import { useAtom } from "jotai";

export const useTagKeys = (): MenuProps["items"] => {
  const { data, setTraceTagKey } = useQueryTraceTagKey();
  /**
   * 下拉的options列表
   */
  const [tagKeyList, setTagKeysList] = useState<MenuProps["items"]>([]);

  /**
   * 根据当前输入的sessionId做模糊搜索，刷新options
   */
  const setSearchTagKeys = debounce(setTraceTagKey, 400);

  const [searchKeys, setSelectedSearchKeys] = useAtom(tagKeysAtom);
  const [tags, setTags] = useAtom(tagsAtom);

  useEffect(() => {
    const existKeys: string[] = [];
    // 保留的tags
    const filterTags = tags.filter((tag) => {
      let hasTag = false;
      searchKeys.forEach((i) => {
        if (tag[i]) {
          existKeys.push(i);
          hasTag = true;
        }
      });
      return hasTag;
    });
    // 新增的tags
    const newTags = searchKeys
      .filter((i) => !existKeys.includes(i))
      .map((i) => {
        let tag: { [key: string]: string[] } = {};
        tag[i] = [];
        return tag;
      });
    setTags([...filterTags, ...newTags]);
  }, [searchKeys.length]);

  useEffect(() => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTagKeys(e.target.value);
    };

    const items: MenuProps["items"] = [
      {
        key: "search",
        label: (
          <Input
            key={"search"}
            prefix={<SearchOutlined />}
            onInput={handleInputChange}
          />
        ),
      },
    ];
    const pops = data?.map((id) => {
      // console.log(searchKeys.includes(id) ? false : true)
      return {
        key: id,
        label: (
          <Checkbox
            disabled={
              searchKeys.length >= 5 && (searchKeys.includes(id) ? false : true)
            }
            key={id}
            onChange={(e) => {
              /**
               * 如果选中，就添加到searchKeys中，并去重
               */
              if (e.target.checked) {
                setSelectedSearchKeys(Array.from(new Set([...searchKeys, id])));
              } else {
                /**
                 * 如果取消选中，就从searchKeys中删除
                 */
                setSelectedSearchKeys(searchKeys.filter((key) => key !== id));
              }
              // e.target.checked
            }}
          >
            {id}
          </Checkbox>
        ),
      };
    });
    setTagKeysList([...items, ...(pops ?? [])]);
  }, [data, searchKeys]);

  return tagKeyList;
};
