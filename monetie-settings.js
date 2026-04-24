/**
 * Monetie Eyewear — Virtual Try-On Configuration
 * Site: www.monetieyewear.com
 *
 * Drop this file AFTER app.min.js and BEFORE tracking-min.js.
 * Overrides settings_tryon defaults with Monetie brand values.
 */

var vpath = "./";

var settings_tryon = {
    vtopath: vpath,

    // --- Canvas dimensions ---
    width:  "340",
    height: "420",

    // --- Control bar ---
    panelwidth:  "380",
    panelheight: "56",
    panellocation: "external",   // keep bar outside the canvas

    // --- Thumbnail strip ---
    modelThumbWidth: "90",

    // --- Flash fallbacks (keep for legacy browsers) ---
    swfpath:     vpath + "assets/swfs/filebtn.swf",
    storagepath: vpath + "assets/swfs/StorageDevice.swf",
    webcampath:  vpath + "assets/swfs/webcam.swf",

    // --- Monetie brand palette ---
    chromeColor:       "#1a1a1a",
    fontcolor:         "#f0e6d0",   // warm cream on dark
    panelcolor:        "#1a1a1a",
    panelalpha:        "98",
    panelborder:       "1",
    panelbordercolor:  "#c9a84c",   // gold accent

    // --- Control bar buttons ---
    buttons: [
        "browse*"       + vpath + "assets/images/upload-image.png",
        "webcam*"       + vpath + "assets/images/web-cam.png",
        "modelgallery*" + vpath + "assets/images/group.png"
    ].join(","),

    buttonstooltip: "browse*Upload Photo,webcam*Use Camera,modelgallery*Try a Model",

    // --- Webcam UI icons ---
    takepicicon:        vpath + "assets/images/web-cam-click.png",
    takepicicontooltip: "Capture",
    usepictureicon:     vpath + "assets/images/usepicture.png",
    usepicturetooltip:  "Use This Photo",
    closebutton:        vpath + "assets/images/cancel.png",
    discardpicturetooltip: "Retake",
    closevto:           vpath + "assets/images/close.png",
    okbutton:           vpath + "assets/images/okbutton.png",

    // --- Action icons ---
    savebutton:         vpath + "assets/images/save.png",
    savebuttontooltip:  "Save Your Look",
    okbuttontooltip:    "Done",
    closebuttontooltip: "Close",

    // --- Error / permission messages ---
    adjustmenterror:       "Please set the pupil location to continue.",
    noCamMsg:              "No camera detected. Please upload a photo instead.",
    permissionDeniedError: "Camera access was denied. Click the camera icon in your address bar, allow access, then reload.",

    // --- Model templates ---
    modelsimages: [
        vpath + "assets/images/female1.jpg",
        vpath + "assets/images/female2.jpg",
        vpath + "assets/images/female3.jpg",
        vpath + "assets/images/male1.jpg",
        vpath + "assets/images/male2.jpg",
        vpath + "assets/images/male3.jpg"
    ].join(","),

    // Pupillary distance reference data for each template: "Lx-Ly:Rx-Ry"
    modeldata:    "61-105:150-105,82-132:144-132,83-145:135-145,78-139:144-139,77-119:135-119,85-120:151-120",
    defaultmodel: "4",

    // --- Misc UI ---
    license:     "license.txt",
    gacode:      "",   // paste your GA4 measurement ID here, e.g. "G-XXXXXXXXXX"
    preloader:   vpath + "assets/images/loader.gif",
    loadingmsg:  "Loading…",

    // --- Adjustment panel labels ---
    adjustmenticon:        vpath + "assets/images/adjustment.png",
    userImageScale:        "Resize Photo",
    userImageRotate:       "Rotate Photo",
    frameScale:            "Resize Frame",
    frameRotate:           "Rotate Frame",
    adjustmentPanelWidth:  "340",
    adjustmentPanelHeight: "360",

    // --- Resizer panel ---
    resizerPanelHeight:  "300",
    resizerPanelWidth:   "44",
    resizerPanelColor:   "#c9a84c",   // gold
    resizerPanelOpacity: "0.85",

    // --- Frame transform controls ---
    FrameReset:           vpath + "assets/images/reset.png",
    FrameResetTitle:      "Reset",
    FrameRotateLeft:      vpath + "assets/images/rotate-left.png",
    FrameRotateLeftTitle: "Rotate Left",
    FrameRotateRight:     vpath + "assets/images/rotate-right.png",
    FrameRotateRightTitle:"Rotate Right",
    FrameScaleUp:         vpath + "assets/images/zoom-in.png",
    FrameScaleUpTitle:    "Scale Up",
    FrameScaleDown:       vpath + "assets/images/zoom-out.png",
    FrameScaleDownTitle:  "Scale Down",

    // --- Social share ---
    FacebookShare:      vpath + "assets/images/facebook.png",
    FacebookShareTitle: "Share on Facebook",
    TwitterShare:       vpath + "assets/images/twitter.png",
    TwitterShareTitle:  "Share on Twitter",
    SaveImage:          vpath + "assets/images/download.png",
    SaveImageTitle:     "Save Your Look",

    isShowTitleWithIcon: true,

    // --- Save / share endpoints ---
    saveFileUrl:      "save.php",
    shareTitle:       "My Look — Monetie Eyewear",
    shareDescription: "I just tried on glasses virtually at www.monetieyewear.com!",
    shareURL:         "https://www.monetieyewear.com/tryon/share",
    twitterHashtag:   "MonetieEyewear,VirtualTryOn,Eyewear",
    saveImageTitle:   "MonetieEyewear-MyLook.png",

    // --- Canvas border ---
    bordercolor: "#c9a84c",
    fontSize:    "11",
    isPanel:     true,

    debug: "false"
};
