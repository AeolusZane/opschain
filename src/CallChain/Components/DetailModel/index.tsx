import { useState } from "react";
import { Modal, Typography } from "antd";
import { Col, Row, Space } from "@fd/react";
import { atom, useAtom } from "jotai";
export type DetailTagsType = { key: string; value: string };

const { Text } = Typography;

export const modelTagsAtom = atom<DetailTagsType[]>([]);
export const showModalAtom = atom(false);
showModalAtom.onMount = (set) => {
  set(false);
};

export function DetailModel() {
  const [open, setOpen] = useAtom(showModalAtom);
  const [disabled, setDisabled] = useState(true);

  const [detailTags] = useAtom(modelTagsAtom);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        width={800}
        style={{
          height: 400,
        }}
        title={
          <div
            style={{
              width: "100%",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            {"查看详情"}
          </div>
        }
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <Space
          size={8}
          direction="vertical"
          style={{ display: "flex", height: "450px", overflow: "auto" }}
          wrap={false}
        >
          {detailTags.map((i) => (
            <Row key={i.key}>
              <Col span={10}>
                <Text type={"secondary"}>{`${i.key} :`}</Text>
              </Col>
              <Col span={14}>{`${i.value}`.repeat(10)}</Col>
            </Row>
          ))}
        </Space>
      </Modal>
    </>
  );
}
