import { ref } from "vue";

function useMouse() {
  const showTip = ref(false);

  function handleMmouseenter() {
    console.log("handleMouseover");
    showTip.value = true;
  }

  function handleMouseleave() {
    console.log("handleMouseout");
    showTip.value = false;
  }

  return {
    showTip,
    handleMmouseenter,
    handleMouseleave,
  };
}

export default useMouse;
