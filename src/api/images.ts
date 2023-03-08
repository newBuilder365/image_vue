import request from "../utils/request"

// 获取所有图片
export const getAllImages = () => {
  return request.get<{ images: string[] }>('/images')
}