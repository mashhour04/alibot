const cardAvatarStyle = {
  cardAvatar: {
    "&$cardAvatarProfile img": {
      width: "100%",
      height: "auto"
    }
  },
  cardAvatarProfile: {
    
    display: "flex",
    width: "20%",
    maxWidth: "100px",
    maxHeight: "100px",
    // margin: "-50px auto 0",
    marginLeft: "auto",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "&$cardAvatarPlain": {
      marginTop: "0"
    }
  },
  cardAvatarPlain: {}
};

export default cardAvatarStyle;


    /* margin: -86px auto -44px; */
    // padding: 0;
    // overflow: hidden;
    // max-width: 100px;
    // max-height: 100px;
    // box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
    // border-radius: 50%;
    // margin-left: auto;
    /* margin-top: auto; */