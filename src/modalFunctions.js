
 
 export const openLoginPopup = (setIsLoginPopupOpen, setIsSignupPopupOpen) => {
    setIsLoginPopupOpen(true);
    setIsSignupPopupOpen(false); 
  };// تسكير تسجيل الحساب يلي هو سايناب لما نفتح اللوغين

  export const closeLoginPopup = (setIsLoginPopupOpen) => {
    setIsLoginPopupOpen(false);
  };

  export const openSignupPopup = (setIsSignupPopupOpen, setIsLoginPopupOpen) => {
    setIsSignupPopupOpen(true);
    setIsLoginPopupOpen(false); 
  };//تسكير اللوغن لما السايناب تفتح

  export const closeSignupPopup = (setIsSignupPopupOpen) => {
    setIsSignupPopupOpen(false);
  };

  export const openVerificationPopup = (setIsVerificationPopupOpen, ) => {
    
    setIsVerificationPopupOpen(true);
  };

  export const closeVerificationPopup = (setIsVerificationPopupOpen) => {
    setIsVerificationPopupOpen(false);
  };

  export const handleSignupClick = (setIsSignupPopupOpen, setIsLoginPopupOpen) => {
    setIsSignupPopupOpen(true);
    setIsLoginPopupOpen(false); 
  };
  