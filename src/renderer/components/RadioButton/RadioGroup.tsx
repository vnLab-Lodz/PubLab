import * as React from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  disabled1?: boolean;
  disabled2?: boolean;
  defaults?: string;
}

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px #DDDDDD"
      : "inset 0 0 0 3.5px rgb(0,0,0), inset 0 -3.5px 0 #DDDDDD",
  border: "1px solid #DDDDDD",
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#000",
  ".Mui-focusVisible &": {
    outline: "1px auto #DDDDDD",
    outlineOffset: 1
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5"
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)"
  }
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#fff",
  
  "input:hover ~ &": {
    backgroundColor: "#DDDDDD"
  }
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "black"
        },
               
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}



const OurRadio: React.FC<Props> = ({disabled1, disabled2, defaults}) => {

    const [checked, setChecked] = React.useState<boolean>(); 
  
    const handleChange = (event: any) => {
     
      //setChecked(event.target.value);
     // props.onChange(); 
    
     console.log('checking some stuff')
    };
  
  
    return (
        <FormControl component="fieldset">
          <Box pb={4} pt={2}>
        <FormLabel component="legend"><Typography variant="h4" color="text.primary"> Choose the Package Manager:</Typography></FormLabel>
        </Box>
        <RadioGroup
          defaultValue={defaults}
          name="customized-radios"
        >
          <FormControlLabel  disabled={disabled1} value="yarn" control={<BpRadio />} label={<Typography variant="h5" color="default">YARN</Typography>}/>
          <FormControlLabel disabled={disabled2} value="npm" control={<BpRadio />} label={<Typography variant="h5" color="default">NPM</Typography>}/>
         
        </RadioGroup>
      </FormControl>
    );
  }
  
  export default OurRadio;