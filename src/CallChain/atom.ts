import { useAtom, atom } from "jotai";
import { TraceDetailType } from "./Components/TraceTable/crud";
// import { useResetAtom } from 'jotai/utils';

/**
 * @description: 调用链的查询id
 * todo 注意，这里声明的atom会放到全局，所以组件重新render时不会重置（切换运维项目），要手动在需要的地方重置，比如对应的根组件
 */
export const id = atom("");
id.onMount = (set) => {
  set("");
};

export const serviceIdAtom = atom("");

/**
 * 时间范围
 */
export const timeRangeAtom = atom<{
  startTime: number;
  endTime: number;
}>({
  startTime: 0,
  endTime: 0,
});


/**
 * 访问内容
 */
export const sceneTypeListAtom = atom<string[]>([]);
// 这里选择的类型，会影响访问内容的具体项
export const sceneTypeAtom = atom<string>("");
sceneTypeAtom.onMount = (set) => {
  set("all");
};

/**
 * 端点耗时
 */
export const durationAtom = atom<{
  minDuration: number;
  maxDuration: number;
}>({
  minDuration: 0,
  maxDuration: 0,
});

/**
 * 更多条件项
 */
export const tagKeysAtom = atom<string[]>([]);
export const tagsAtom = atom<{ [key: string]: string[] }[]>([]);
/**
 * 这里单独提个组件，根据选择的tagKey数量生成多个下拉框，下拉框items动态获取，然后生成对象
 */



/**
 * 获取链路列表
 */
export const traceListAtom = atom((get) => {
  const serviceId = get(serviceIdAtom);
  const { startTime, endTime } = get(timeRangeAtom);
  const sceneType = get(sceneTypeAtom);
  const { minDuration, maxDuration } = get(durationAtom);
  const tags = get(tagsAtom);
  const pageSize = 10;

  return {
    serviceId,
    startTime,
    endTime,
    sceneType,
    minDuration,
    maxDuration,
    tags,
    pageSize,
  };
});

/**
 * 链路详情
 */

export const traceDetailIdAtom = atom<string>("");
traceDetailIdAtom.onMount = (set) => {
  set("");
};
