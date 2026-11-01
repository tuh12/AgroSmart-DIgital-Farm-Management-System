// =========================================================
// LEAF PHOTO KEEP FIX
// app.js-e ei duita jinish pabe, duitai delete kore ei code boshao:
//   1) let leafPreviewUrl = null;
//   2) function previewLeafImage() { ... }
// (resetLeafPreview() jemon ache temon thakbe)
// =========================================================

let leafPreviewUrl = null;
let currentLeafFile = null; // selected photo mone rakhe

function previewLeafImage() {
  const input = elements.leafImageInput;
  const file = input?.files?.[0];

  // File dialog "Cancel" korle browser input khali kore dey.
  // Tokhon purono photo-i abar input-e ferot dao, preview-o thakbe.
  if (!file && currentLeafFile) {
    try {
      const dt = new DataTransfer();
      dt.items.add(currentLeafFile);
      input.files = dt.files;
    } catch (error) {
      // purono browser: kichu korar nai
    }
    return;
  }

  if (!file) {
    resetLeafPreview();
    return;
  }

  // Image validation
  if (!file.type.startsWith("image/")) {
    alert(
      isBn()
        ? "দয়া করে একটি সঠিক ছবির ফাইল নির্বাচন করুন।"
        : "Please select a valid image file."
    );
    input.value = "";
    currentLeafFile = null;
    resetLeafPreview();
    return;
  }

  // Maximum 10 MB
  if (file.size > 10 * 1024 * 1024) {
    alert(
      isBn()
        ? "ছবির আকার সর্বোচ্চ ১০ MB হতে পারে।"
        : "Image size must be less than 10 MB."
    );
    input.value = "";
    currentLeafFile = null;
    resetLeafPreview();
    return;
  }

  // Notun valid photo: purono preview URL chhere dao
  if (leafPreviewUrl) URL.revokeObjectURL(leafPreviewUrl);

  currentLeafFile = file;
  leafPreviewUrl = URL.createObjectURL(file);

  if (elements.leafPreview) {
    elements.leafPreview.innerHTML = `
      <img src="${leafPreviewUrl}" alt="Leaf preview" class="leaf-preview-image" />
    `;
    elements.leafPreview.classList.add("show");
  }
}
