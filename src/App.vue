<template>
  <div class="demo-image__preview">
    <el-image style="width: 100px; height: 100px" :zoom-rate="1.2" :preview-src-list="imageList" :initial-index="0"
      fit="cover" />
  </div>
  <el-upload v-model:file-list="imageList" action="https://localhost:9998/upload" list-type="picture-card"
    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
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
</script>
