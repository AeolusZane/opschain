import { useTagKeyItemSelector } from "./hook";
import { Button, Select, Space } from "@fd/react";
import { useAtom } from "jotai";
import { Typography } from "antd";
import { tagKeysAtom, tagsAtom } from "../../atom";
import { CloseCircleFilled as Icon } from "@ant-design/icons";
const { Text } = Typography;

export const ConditionQuery = ({ targetKey }: { targetKey: string }) => {
  /**
   * 调用链路
   */
  const [setSearch, options] = useTagKeyItemSelector();
  const [keyValueList, setKeyValueMap] = useAtom(tagsAtom);
  const [keys, setKeys] = useAtom(tagKeysAtom);

  const selectedIdsChange = (value: string[]) => {
    let keyValue: { [key: string]: string[] } = {};
    keyValue[targetKey] = value;
    let hasKey = false;
    const list = keyValueList.map((i) => {
      if (i[targetKey]) {
        hasKey = true;
        return keyValue;
      }
      return i;
    });
    if (!hasKey) {
      list.push(keyValue);
    }

    setKeyValueMap(list);
  };

  return (
    <Space size={8}>
      <Text>{targetKey}</Text>
      <Select
        mode="tags"
        maxTagCount={0}
        style={{ width: "110px", height: 30 }}
        placeholder="全部"
        onChange={selectedIdsChange}
        onSearch={(id) => {
          setSearch(() => id);
        }}
        options={options}
      />

      <Icon
        style={{ color: "rgba(0,0,0,.75)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(0,0,0,.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(0,0,0,.75)";
        }}
        onClick={() => {
          setKeys(keys.filter((i) => i !== targetKey));
          setKeyValueMap(keyValueList.filter((i) => !i[targetKey]));
        }}
      >
        x
      </Icon>
    </Space>
  );
};
