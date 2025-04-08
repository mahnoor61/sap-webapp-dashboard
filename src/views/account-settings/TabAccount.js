import {useEffect, useState} from 'react';
import {Box, Grid, TextField, Button} from '@mui/material';
import {useFormik} from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../slices/auth'

const TabAccount = () => {
  const [openAlert, setOpenAlert] = useState(true);
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png');
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const user = auth.user;

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    onSubmit: async (values, helpers) => {
      try {
        await axios.post(`${BASE_URL}/api/ap/admin/changeEmail`, values, {
          headers: {
            "x-access-token": token
          }
        });
        toast.success(`Account information updated successfully!`);
        helpers.setSubmitting(false);

        const response = await axios.get(`${BASE_URL}/api/ap/admin/auth`, {
          headers: {
            "x-access-token": token
          }
        });

        dispatch(updateUser(response.data.data));

      } catch (err) {
        toast.error(err.response.data.msg);
        console.error(err);
        helpers.setSubmitting(false);
      }
    },
  });

  const onChange = (file) => {
    const reader = new FileReader();
    const {files} = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{py: 15}}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name='name'
              label='Name'
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name='email'
              type='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              sx={{
                marginRight: 3.5, backgroundColor: '#0563BB', '&:hover': {
                  backgroundColor: '#0AA4D2 !important'  // Updated hover color
                },
              }}
              disabled={formik.isSubmitting}>
              Update Changes
            </Button>
          </Grid>
        </Grid>
      </form>

    </Box>
  );
};

export default TabAccount;
