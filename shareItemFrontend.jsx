import { Copy,Share2, Trash } from "lucide-react";



const handleShare = async () => {
    const shareUrl = window.location.href;
    if(navigator.share) {
        try{
            await navigator.share({
                title: {title} + "Check this out",
                text: "Look at this paste",
                url : shareUrl,
            });
        }catch(err){
            alert("unable to share content");
            console.log("sharing error: " + err.message);
        }
    }else{
        await navigator.clipboard.writeText(shareUrl);
        alert("link Copied");
    }
}


//  below written to be implemented inside component's return 
<button className="bg-blue-600 rounded p-1 text-white" onClick={handleShare} >
  <Share2 size={18} />
</button>

