export const openLoginPopup = (setIsLoginPopupOpen, setIsSignupPopupOpen) => {
  console.log('Opening login popup...');
  setIsLoginPopupOpen(true);
  setIsSignupPopupOpen(false);
};

export const closeLoginPopup = (setIsLoginPopupOpen) => {
  console.log('Closing login popup...');
  setIsLoginPopupOpen(false);
};

export const openSignupPopup = (setIsSignupPopupOpen, setIsLoginPopupOpen) => {
  console.log('Opening signup popup...');
  setIsSignupPopupOpen(true);
  setIsLoginPopupOpen(false);
};

export const closeSignupPopup = (setIsSignupPopupOpen) => {
  console.log('Closing signup popup...');
  setIsSignupPopupOpen(false);
};

export const openVerificationPopup = (setIsVerificationPopupOpen) => {
  console.log('Opening verification popup...');
  setIsVerificationPopupOpen(true);
};

export const closeVerificationPopup = (setIsVerificationPopupOpen) => {
  console.log('Closing verification popup...');
  setIsVerificationPopupOpen(false);
};

export const handleSignupClick = (setIsSignupPopupOpen, setIsLoginPopupOpen) => {
  console.log('Handling signup click...');
  setIsSignupPopupOpen(true);
  setIsLoginPopupOpen(false);
};
