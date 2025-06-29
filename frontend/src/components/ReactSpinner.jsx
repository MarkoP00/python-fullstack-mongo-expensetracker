import { ClipLoader } from "react-spinners";

const override = {
  display: "block",

  zIndex: 9999,
};

const ReactSpinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#66fcf1"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default ReactSpinner;
