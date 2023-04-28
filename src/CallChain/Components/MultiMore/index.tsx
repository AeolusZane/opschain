import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "@fd/react";
import { useState } from "react";
import { useTagKeys } from "./hook";

export const MultiMore = () => {
  const [open, setOpen] = useState(false);
  const tagKeyList = useTagKeys();

  // const [setSearchSessionId, sessionIdList] = useSessionIdSelector();

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };
  return (
    <Dropdown
      onOpenChange={handleOpenChange}
      menu={{
        items: tagKeyList,
        selectable: false,
        defaultSelectedKeys: [],
      }}
      open={open}
    >
      <Typography.Link>
        <Space style={{ height: 30 }}>
          {BI.i18nText("更多")}
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};
