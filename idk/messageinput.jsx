
  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!text.trim() && !imagePreview) return;
  //   try {
  //     await sendMessage({
  //       text: text.trim(),
  //       image: imagePreview,
  //     });
  //     setText("");
  //     setImagePreview(null);
  //     if (fileInputRef.current) fileInputRef.current.value = "";
  //   } catch (error) {
  //     console.error("failed to send message:", error);
  //   }
  // };


    // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file.type.startsWith("image/")) {
  //     toast.error("Please select an image file");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const removeImage = () => {
  //   setImagePreview(null);
  //   if (fileInputRef.current) fileInputRef.current.value = "";
  // };

  // const fileInputRef = useRef(null);



        {/* {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )} */}

                {/* <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          /> */}

          
        {/* <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button> */}