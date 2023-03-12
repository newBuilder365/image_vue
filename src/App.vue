<template>
  <el-upload v-model:file-list="imageList" action="http://114.116.22.167:9998/upload" list-type="picture-card"
    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" name="image">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible" :fullscreen="true">
    <img fit="contain" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import { getAllImages } from "./api/images";
import { useUserStore } from "./store/image";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";

const { updateImageList } = useUserStore();
const imageList = computed(() => useUserStore().imageList);

const getDatas = async () => {
  const res = await getAllImages();
  updateImageList(res.data.images.map(url => ({ name: "", url })));
};

onMounted(() => {
  getDatas();
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleSuccess:UploadProps["onSuccess"]=(response: any)=>{
  updateImageList([{name:"", url:response.imageUrl}])
}
</script>
