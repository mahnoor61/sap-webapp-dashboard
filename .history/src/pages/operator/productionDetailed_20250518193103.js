import React, { useEffect, useState, useRef } from 'react'
import {
  Grid,
  Card,
  TextField,
  CardContent,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { AuthGuard } from '../../guard/authGuard'
import UserLayout from '../../layouts/UserLayout'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const ProductOrderDetail = () => {
  const [open, setOpen] = React.useState(false)
  const [handleDisable, setHandleDisable] = React.useState(false)
  const [stopPopUp, setStopPopUp] = React.useState(false)
  const [makeReadyTimePopUp, setMakeReadyTimePopUp] = React.useState(false)
  const [productionTimePopUp, setProductionTimePopUp] = React.useState(false)
  const [issueForMachine, setIssueForMachine] = useState(false)
  const [completedCty, setCompletedQty] = useState(false)
  const [wastedQty, setWastedQty] = useState(false)
  const [pausePopUp, setPausePopUp] = useState(false)
  const [downPopUp, setDownPopUp] = useState(false)
  const [image, setImage] = useState(null)
  const [isImageValid, setIsImageValid] = useState(false)

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [productionOrderDetail, setProductionOrderDetail] = useState(null)
  const [remainingQty, setRemainingQty] = useState(0)

  //manage timer stats

  const [makeTime, setMakeTime] = useState(0)
  const [makeTimerRunning, setMakeTimerRunning] = useState(false)
  const [isMakeTimeDone, setIsMakeTimeDone] = useState(false)

  const [productionTimer, setProductionTimer] = useState(0)
  const [productionTimerRunning, setProductionTimerRunning] = useState(false)

  const [pauseProductionTimer, setPauseProductionTimer] = useState(0)
  const [pauseProductionTimerRunning, setPauseProductionTimerRunning] = useState(false)

  const [downProductionTimer, setDownProductionTimer] = useState(0)
  const [downProductionTimerRunning, setDownProductionTimerRunning] = useState(false)

  const [previousRouteCompletedQuantity, setPreviousRouteCompletedQuantity] = useState(0)
  const [showCustomReason, setShowCustomReason] = useState(false)
  const [prod, setProd] = useState('')

  const [isPauseClick, setIsPauseClick] = useState(false)
  const [isDownClick, setIsDownClick] = useState(false) // already in your code
  const [downTimer, setDownTimer] = useState(0)
  const [isDownTimerRunning, setIsDownTimerRunning] = useState(false)
  const downTimerRef = useRef(null)

  // const [isLastRoute, setIsLastRoute] = useState(false);

  const router = useRouter()
  const auth = useSelector(state => state.auth)
  const token = auth.token

  // function for make ready time confirmation pop up
  const handleMakeConfirmationOpen = () => {
    setMakeReadyTimePopUp(true)
  }

  const handleMakeConfirmationClose = () => {
    setMakeReadyTimePopUp(false)
  }

  // function for production time confirmation pop up
  const handleProdConfirmationOpen = () => {
    setProductionTimePopUp(true)
  }

  const handleProdConfirmationClose = () => {
    setProductionTimePopUp(false)
  }

  // function for recieved by opertaor
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // function for stop pop up
  const handleStopClickOpen = () => {
    setStopPopUp(true)
  }

  const handleStopClickClose = () => {
    setStopPopUp(false)
  }

  // function for issue for machine
  const handleClickIssueForMachineOpen = () => {
    setIssueForMachine(true)
  }

  const handleIssueForMachineClose = () => {
    setIssueForMachine(false)
  }

  // function for completed Qty
  const handleCompletedQtyOpen = () => {
    setCompletedQty(true)
  }

  const handleCompletedQtyClose = () => {
    setCompletedQty(false)
  }

  // function for wasted Qty
  const handleWastedQtyOpen = () => {
    setWastedQty(true)
  }

  const handleWastedQtyClose = () => {
    setWastedQty(false)
  }

  // function for pause pop up
  const handlePauseClickOpen = () => {
    setPausePopUp(true)
  }

  const handlePauseClickClose = () => {
    setPausePopUp(false)
  }

  // function for downTime pop up
  const handleDownClickOpen = () => {
    setDownPopUp(true)
  }

  const handleDownClickClose = () => {
    setDownPopUp(false)
  }

  const { order } = router.query

  useEffect(() => {
    if (order) {
      // Step 1: Try loading from localStorage
      const localData = localStorage.getItem(`productionData-${order}`)
      if (localData) {
        setProductionOrderDetail(JSON.parse(localData))
      }

      // Step 2: Always fetch from API in background
      const fetchProductionData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/operator/doc-data/${order}`, {
            headers: {
              'x-access-token': token
            }
          })
          const data = response.data.data
          setProductionOrderDetail(data)

          // Step 3: Save fresh data to localStorage
          localStorage.setItem(`productionData-${order}`, JSON.stringify(data))
          setLoading(false)
        } catch (error) {
          console.error('Failed to fetch production order detail API:', error)
          toast.error(error.response?.data?.msg || 'Failed to load data')
          setLoading(false)
        }
      }

      fetchProductionData()
    }
  }, [router.query])

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      recievedByOperator: ''
    },
    validationSchema: Yup.object({
      recievedByOperator: Yup.number().required('Received by operator is required!')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/operator/update/recieved-by-operator/${productionOrderDetail._id}`,
          {
            recievedByOperator: values.recievedByOperator
          },
          {
            headers: { 'x-access-token': token }
          }
        )
        toast.success('Receive by operator added successfully.')
        setProductionOrderDetail(response.data.data)
        await getRemainingQty()
        formik.resetForm()
      } catch (error) {
        console.log('error in recieve by operator', error)
        toast.error(error.response.data.msg)
        formik.resetForm()
      }
    }
  })

  // formik for issue for machine

  const issueFormik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      id: '',
      issueForMachine: ''
    },
    validationSchema: Yup.object({
      issueForMachine: Yup.number().required('Issue for machine is required!')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/operator/add/issue-for-machine`,
          {
            id: productionOrderDetail._id,
            issueForMachine: values.issueForMachine
          },
          {
            headers: { 'x-access-token': token }
          }
        )

        toast.success('Issue for machine added successfully.')
        setProductionOrderDetail(response.data.data)
        await getRemainingQty()

        try {
          const sapSessionId = localStorage.getItem('sessionId')

          const sapResponse = await axios.post(
            `${BASE_URL}/api/ap/operator/get/first/route`,
            {
              id: productionOrderDetail._id,
              Quantity: values.issueForMachine,
              sessionId: sapSessionId
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
              }
            }
          )

          console.log('sapResponse issue for machine=>', sapResponse)
        } catch (error) {
          console.log('error in posting issue for machine into sap', error.response.data.msg)
        }

        issueFormik.resetForm()
      } catch (error) {
        console.log('error in issue for machine', error)
        toast.error(error.response.data.msg)
        issueFormik.resetForm()
      }
    }
  })

  const completeFormik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      id: '',
      completedQuantity: ''
    },
    validationSchema: Yup.object({
      completedQuantity: Yup.number().required('Completed Quantity is required!')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/operator/add/completed-quantity`,
          {
            id: productionOrderDetail._id,
            completedQuantity: values.completedQuantity
          },
          {
            headers: { 'x-access-token': token }
          }
        )
        toast.success('Completed quantity added successfully.')
        setProductionOrderDetail(response.data.data)
        await updatePalleteNo()

        try {
          const sapSessionId = localStorage.getItem('sessionId')

          const sapResponse = await axios.post(
            `${BASE_URL}/api/ap/operator/get/last/route`,
            {
              id: productionOrderDetail._id,
              Quantity: values.completedQuantity,
              sessionId: sapSessionId
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
              }
            }
          )

          console.log('sapResponse of completed quantity=>', sapResponse)
        } catch (error) {
          console.log('error in posting completed quantity into sap', error.response.data.msg)
        }

        completeFormik.resetForm()
      } catch (error) {
        console.log('error in completed qty', error)
        toast.error(error.response.data.msg)
        completeFormik.resetForm()
      }
    }
  })

  const wastedFormik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      id: '',
      wastedQuantity: ''
    },
    validationSchema: Yup.object({
      wastedQuantity: Yup.number().required('Wasted Quantity is required!')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/operator/add/wasted-quantity`,
          {
            id: productionOrderDetail._id,
            wastedQuantity: values.wastedQuantity
          },
          {
            headers: { 'x-access-token': token }
          }
        )
        toast.success('Wasted quantity added successfully.')
        const newQty = parseInt(values.wastedQuantity)
        console.log('newQty', newQty)

        // ✅ Update localStorage
        const existing = JSON.parse(localStorage.getItem('wastedData'))

        console.log('existing', existing)

        // const existingIndex = existing.findIndex(entry => entry.id === id)

        if (!existing) {
  
}
  // if (existingIndex !== -1) {
  //   existing[existingIndex].wastedQuantity += newQty
  // } else {
  //   existing.push({ id, wastedQuantity: newQty })
  // }

  localStorage.setItem('wastedData', JSON.stringify(existing))

        setProductionOrderDetail(response.data.data)
        await updatePalleteNo()
        wastedFormik.resetForm()
      } catch (error) {
        console.log('error in wasted qty', error)
        toast.error(error.response.data.msg)
        wastedFormik.resetForm()
      }
    }
  })

  // get remianing qty:

  const getRemainingQty = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/ap/operator/get/remaining-quantity/${productionOrderDetail._id}`,
        {
          headers: {
            'x-access-token': token
          }
        }
      )
      const data = response.data.data.remainingQuantity
      setRemainingQty(data)
    } catch (error) {
      console.error('Failed to fetch reminaing  qty:', error)
    }
  }

  useEffect(() => {
    if (productionOrderDetail?._id) {
      getRemainingQty()
    }
  }, [productionOrderDetail?._id])

  const getTotalCompletedQuantityOfPreviousRoute = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/ap/operator/get/completed-quantity/previous-route`,
        {
          id: productionOrderDetail._id,
          ComponentItemCode: productionOrderDetail.ComponentItemCode,
          productionOrder: productionOrderDetail.productionOrderNo,
          routeNo: productionOrderDetail.routeNo
        },
        {
          headers: {
            'x-access-token': token
          }
        }
      )
      const data = response.data.data
      setPreviousRouteCompletedQuantity(data)
    } catch (error) {
      console.error('Failed to fetch total completed  qty of previous route...............', error)
    }
  }

  useEffect(() => {
    getTotalCompletedQuantityOfPreviousRoute()
  }, [productionOrderDetail])

  const handleStartMakeTime = async () => {
    // await handleStopClickClose()

    if (!makeTimerRunning) {
      const startTimestamp = Date.now()
      localStorage.setItem(`makeTimerStart-${order}`, startTimestamp.toString())
      localStorage.setItem(`makeTimerRunning-${order}`, 'true')

      setMakeTimerRunning(true)
      setMakeTime(0)

      // Add this to start the timer immediately
      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTimestamp) / 1000)
        setMakeTime(elapsed)
      }, 1000)
      await updateStatus('make-ready-time')

      // Save the interval id in a ref or variable to clear later if needed
    }
  }

  useEffect(() => {
    const running = localStorage.getItem(`makeTimerRunning-${order}`)
    const start = localStorage.getItem(`makeTimerStart-${order}`)

    if (running === 'true' && start) {
      setMakeTimerRunning(true)

      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - parseInt(start)) / 1000)
        setMakeTime(elapsed)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [order])

  const handleStartProduction = async () => {
    try {
      const formattedTime = formatTimeToHHMMSS(makeTime)

      const res = await axios.post(
        `${BASE_URL}/api/ap/operator/production/order/update/make-time`,
        {
          id: productionOrderDetail._id,
          makeTime: formattedTime
        },
        {
          headers: { 'x-access-token': token }
        }
      )

      toast.success('Make time saved!')

      // Reset make timer
      localStorage.removeItem(`makeTimerRunning-${order}`)
      localStorage.removeItem(`makeTimerStart-${order}`)
      setMakeTimerRunning(false)
      setMakeTime(0)
      setIsMakeTimeDone(true)

      setDisabled(false) //finish disabled button here on start production
      // Start production timer

      const startTime = Date.now()
      localStorage.setItem(`productionTimerStart-${order}`, startTime.toString())
      localStorage.setItem(`productionTimerRunning-${order}`, 'true')
      setProductionTimerRunning(true)
      setProductionTimer(0)

      // ✅ Start timer interval immediately
      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        setProductionTimer(elapsed)
      }, 1000)

      // optionally store interval ID if you plan to clear it later
    } catch (error) {
      toast.error('Failed to start production.')
      console.error(error)
    }
  }

  useEffect(() => {
    const running = localStorage.getItem(`productionTimerRunning-${order}`)
    const start = localStorage.getItem(`productionTimerStart-${order}`)

    if (running === 'true' && start) {
      setProductionTimerRunning(true)

      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - parseInt(start)) / 1000)
        setProductionTimer(elapsed)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [order])

  const updateStatus = async status => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/ap/operator/update/status`,
        {
          id: productionOrderDetail._id,
          status: status
        },
        {
          headers: {
            'x-access-token': token
          }
        }
      )
    } catch (error) {
      console.error('error in update status', error)
    }
  }

  const pauseFormik = useFormik({
    initialValues: {
      pauseReason: '',
      customPauseReason: ''
    },
    validationSchema: Yup.object({
      pauseReason: Yup.string().required('Pause reason is required'),
      customPauseReason: Yup.string().when('pauseReason', {
        is: val => val === 'Other',
        then: schema => schema.required('Please specify the reason'),
        otherwise: schema => schema.notRequired()
      })
    }),
    onSubmit: values => {
      handlePauseProduction()
    }
  })

  const handlePauseProduction = async () => {
    try {
      const formattedProductionTime = formatTimeToHHMMSS(productionTimer)

      const PauseReason =
        pauseFormik.values.pauseReason === 'Other'
          ? pauseFormik.values.customPauseReason
          : pauseFormik.values.pauseReason

      if (!PauseReason || PauseReason.trim() === '') {
        toast.error('Please enter a pause reason.')

        return
      }

      // Save production timer to API
      await axios.post(
        `${BASE_URL}/api/ap/operator/production/order/update/production-time`,
        {
          id: productionOrderDetail._id,
          startProductionTime: formattedProductionTime,
          pauseReason: PauseReason
        },
        {
          headers: { 'x-access-token': token }
        }
      )

      toast.success('Production time & pause reason saved!')
      setPausePopUp(false)
      setIsPauseClick(true)
      setHandleDisable(true)

      localStorage.removeItem(`productionTimerRunning-${order}`)
      localStorage.removeItem(`productionTimerStart-${order}`)
      setProductionTimerRunning(false)
      setProductionTimer(0)

      // Start pause timer
      const pauseStart = Date.now()
      localStorage.setItem(`pauseProductionTimerStart-${order}`, pauseStart.toString())
      localStorage.setItem(`pauseProductionTimerRunning-${order}`, 'true')
      setPauseProductionTimerRunning(true)
      setPauseProductionTimer(0)

      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - pauseStart) / 1000)
        setPauseProductionTimer(elapsed)
      }, 1000)

      // optionally store interval ID to clear later
    } catch (error) {
      toast.error('Failed to pause production.')
      console.error(error)
    }
  }

  useEffect(() => {
    const running = localStorage.getItem(`pauseProductionTimerRunning-${order}`)
    const start = localStorage.getItem(`pauseProductionTimerStart-${order}`)

    if (running === 'true' && start) {
      setPauseProductionTimerRunning(true)

      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - parseInt(start)) / 1000)
        setPauseProductionTimer(elapsed)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [order])

  const convertHHMMSSStringToSeconds = timeString => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)

    return hours * 3600 + minutes * 60 + seconds
  }

  const intervalRef = useRef(null) // to store interval id globally

  const handleResumeProduction = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/ap/operator/get/prodTime/${productionOrderDetail._id}`, {
        headers: { 'x-access-token': token }
      })

      const productionTimeString = res.data.data // "00:00:10"
      const serverProductionSeconds = convertHHMMSSStringToSeconds(productionTimeString)

      const formattedTime = formatTimeToHHMMSS(pauseProductionTimer)

      await axios.post(
        `${BASE_URL}/api/ap/operator/production/order/update/pause-production-time`,
        {
          id: productionOrderDetail._id,
          pauseProductionTime: formattedTime
        },
        {
          headers: { 'x-access-token': token }
        }
      )

      toast.success('Pause time saved and production resumed!')

      // Clear Pause Timer

      localStorage.removeItem(`pauseProductionTimerStart-${order}`)
      localStorage.removeItem(`pauseProductionTimerRunning-${order}`)
      setMakeTimerRunning(false)
      setMakeTime(0)
      setHandleDisable(false)

      const startTime = Date.now() - serverProductionSeconds * 1000

      localStorage.setItem(`productionTimerRunning-${order}`, 'true')
      localStorage.setItem(`productionTimerStart-${order}`, startTime.toString())
      setProductionTimerRunning(true)
      window.location.reload()
      setDisabled(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // Start a new one
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        setProductionTimer(elapsed)
      }, 1000)
    } catch (error) {
      toast.error('Failed to start production.')
      console.error(error)
    }
  }

  const handleBreakProduction = async () => {
    try {
      const formattedProductionTime = formatTimeToHHMMSS(productionTimer)

      await axios.post(
        `${BASE_URL}/api/ap/operator/production/order/break/production-time`,
        {
          id: productionOrderDetail._id,
          startProductionTime: formattedProductionTime
        },
        {
          headers: { 'x-access-token': token }
        }
      )

      toast.success('Job break successfully!')

      // Clear Pause Timer

      localStorage.removeItem(`productionTimerRunning-${order}`)
      localStorage.removeItem(`productionTimerStart-${order}`)
      setProductionTimerRunning(false)
      setProductionTimer(0)
      setIsMakeTimeDone(false)
      setMakeTimerRunning(false)
    } catch (error) {
      toast.error('Failed to break production.')
      console.error(error)
    }
  }

  useEffect(() => {
    const isRunning = localStorage.getItem(`productionTimerRunning-${order}`)
    const startTimeStr = localStorage.getItem(`productionTimerStart-${order}`)

    if (isRunning === 'true' && startTimeStr) {
      const startTime = parseInt(startTimeStr)
      setProductionTimerRunning(true)
      setDisabled(false)

      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        setProductionTimer(elapsed)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [order])

  //down time
  const downFormik = useFormik({
    initialValues: {
      downReason: '',
      customDownReason: ''
    },
    validationSchema: Yup.object({
      downReason: Yup.string().required('Down time reason is required'),
      customDownReason: Yup.string().when('downReason', {
        is: val => val === 'Other',
        then: schema => schema.required('Please specify the reason'),
        otherwise: schema => schema.notRequired()
      })
    }),
    onSubmit: values => {
      handleDownTimeProduction()
    }
  })

  const handleDownTimeProduction = async () => {
    try {
      const formattedProductionTime = formatTimeToHHMMSS(productionTimer)

      const DownReason =
        downFormik.values.downReason === 'Other' ? downFormik.values.customDownReason : downFormik.values.downReason

      if (!DownReason || DownReason.trim() === '') {
        toast.error('Please enter a down time reason.')

        return
      }

      // Save production timer to API
      await axios.post(
        `${BASE_URL}/api/ap/operator/update/downtime`,
        {
          id: productionOrderDetail._id,
          startProductionTime: formattedProductionTime,
          downTimeReason: DownReason
        },
        {
          headers: { 'x-access-token': token }
        }
      )

      toast.success('Production time & down time reason saved!')
      setDownPopUp(false)
      setIsDownClick(true)
      setHandleDisable(true)

      localStorage.removeItem(`productionTimerRunning-${order}`)
      localStorage.removeItem(`productionTimerStart-${order}`)
      setIsDownClick(true)
      setIsDownTimerRunning(true)
      setDownTimer(0)

      const downStart = Date.now()
      localStorage.setItem(`downProductionTimerStart-${order}`, downStart.toString())
      localStorage.setItem(`downProductionTimerRunning-${order}`, 'true')

      downTimerRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - downStart) / 1000)
        setDownTimer(elapsed)
        setDownProductionTimer(elapsed)
      }, 1000)

      // optionally store interval ID to clear later
    } catch (error) {
      toast.error('Failed to pause production.')
      console.error(error)
    }
  }

  useEffect(() => {
    const running = localStorage.getItem(`downProductionTimerRunning-${order}`)
    const start = localStorage.getItem(`downProductionTimerStart-${order}`)

    if (running === 'true' && start) {
      setIsDownClick(true)
      setIsDownTimerRunning(true)

      downTimerRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - parseInt(start)) / 1000)
        setDownTimer(elapsed)
        setDownProductionTimer(elapsed)
      }, 1000)

      return () => clearInterval(downTimerRef.current)
    }
  }, [order])

  //downtime end:

  const intervalDown = useRef(null) // to store interval id globally

  const handleDownTimeEnd = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/ap/operator/get/prodTime/${productionOrderDetail._id}`, {
        headers: { 'x-access-token': token }
      })

      const productionTimeString = res.data.data // "00:00:10"
      // setDisabled(false);
      const serverProductionSeconds = convertHHMMSSStringToSeconds(productionTimeString)

      const formattedTime = formatTimeToHHMMSS(downProductionTimer)

      const resp = await axios.post(
        `${BASE_URL}/api/ap/operator/save/downtime`,
        {
          id: productionOrderDetail._id,
          downTime: formattedTime
        },
        {
          headers: { 'x-access-token': token }
        }
      )

      toast.success('Down time saved and production resumed!')

      // Clear Pause Timer
      localStorage.removeItem(`downProductionTimerStart-${order}`)
      localStorage.removeItem(`downProductionTimerRunning-${order}`)

      // setMakeTimerRunning(false);
      // setMakeTime(0);

      // Resume Production Timer
      const startTime = Date.now() - serverProductionSeconds * 1000

      localStorage.setItem(`productionTimerRunning-${order}`, 'true')
      localStorage.setItem(`productionTimerStart-${order}`, startTime.toString())
      setProductionTimerRunning(true)
      setHandleDisable(false)
      window.location.reload()

      // Clear any existing interval
      if (intervalDown.current) {
        clearInterval(intervalDown.current)
      }

      // Start a new one
      intervalDown.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        setProductionTimer(elapsed)
      }, 1000)
    } catch (error) {
      toast.error('Failed to start production. in handle down time end')
      console.error(error)
    }
  }

  useEffect(() => {
    const isRunning = localStorage.getItem(`productionTimerRunning-${order}`)
    const startTimeStr = localStorage.getItem(`productionTimerStart-${order}`)

    if (isRunning === 'true' && startTimeStr) {
      const startTime = parseInt(startTimeStr)
      setProductionTimerRunning(true)
      setDisabled(false)

      const interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        setProductionTimer(elapsed)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [order])

  const formatTimeToHHMMSS = totalSeconds => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  //stop button
  const handleImage = event => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.src = e.target.result

      img.onload = () => {
        // if (img.width !== 1920 || img.height !== 1080) {
        //   toast.error("Please upload an image with dimensions 1920x1080.");
        //   formik.setFieldValue("image", null);
        //   event.target.value = ""; // Input field reset karega
        //
        //   return;
        // }

        // Agar image valid hai, to Formik state ko update karo
        stopFormik.setFieldValue('images', file)
        setImage(file)
        setIsImageValid(true)
      }
    }

    reader.readAsDataURL(file)
  }

  useEffect(() => {}, [image])

  const stopFormik = useFormik({
    initialValues: {
      id: '',
      startProductionTime: '',
      images: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const formattedProductionTime = formatTimeToHHMMSS(productionTimer)
        const formData = new FormData()

        formData.append('id', productionOrderDetail._id)
        formData.append('startProductionTime', formattedProductionTime)
        formData.append('images', values.images) // image comes from Formik now

        await axios.post(`${BASE_URL}/api/ap/operator/save/prodTime/on-stop`, formData, {
          headers: {
            'x-access-token': token
          }
        })

        toast.success('Production stopped successfully.')
        setProductionTimerRunning(false) // Yeh timer band karne ke liye
        setProductionTimer(0)
        stopFormik.resetForm()
        handleStopClickClose()
        setDisabled(true)
        localStorage.removeItem(`productionTimerRunning-${order}`)
        localStorage.removeItem(`productionTimerStart-${order}`)
      } catch (error) {
        console.error('Error in production stop:', error)
        toast.error(error?.response?.data?.msg || 'Error stopping production')
      }
    }
  })

  const updatePalleteNo = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/ap/operator/update/issue-for-machine`,
        {
          id: productionOrderDetail._id
        },
        {
          headers: {
            'x-access-token': token
          }
        }
      )
      setProductionOrderDetail(response.data.data)
      console.log('response', response)
    } catch (error) {
      console.error('error in update pallete for issue for machine', error)
    }
  }

  return (
    <Grid container justifyContent='space-between'>
      {productionOrderDetail && (
        <>
          {/*<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', width:'100%'}}>*/}

          <Card
            variant='outlined'
            sx={{
              width: '100%',
              py: 15,
              display: 'flex',
              AlignItem: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <CardContent>
              {/*show card in row/columns */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 10, mt: 5 }}>
                <Card sx={{ flex: 1, boxShadow: '0 4px 20px skyblue', pb: 10 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { md: 'row', xs: 'column' },
                        width: '100%',
                        mt: 10,
                        mb: 10
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: { md: 'column', xs: 'column' },
                          width: '100%',
                          mt: 10,
                          mb: 10
                        }}
                      >
                        <Box
                          display='flex'
                          justifyContent='space-between'
                          alignItems='center'
                          flexWrap='wrap'
                          gap={2}
                          sx={{ width: '100%', flexDirection: 'column' }}
                        >
                          <Box sx={{ width: '100%' }}>
                            {isDownClick ? (
                              <Typography variant='h5'>Downtime: {formatTimeToHHMMSS(downTimer)}</Typography>
                            ) : (
                              <>
                                {makeTimerRunning && !productionTimerRunning && (
                                  <Typography variant='h5'>Make Ready Time: {formatTimeToHHMMSS(makeTime)}</Typography>
                                )}
                                {productionTimerRunning && (
                                  <Typography variant='h5'>
                                    Production Time: {formatTimeToHHMMSS(productionTimer)}
                                  </Typography>
                                )}
                                {!productionTimerRunning && pauseProductionTimer ? (
                                  <Typography variant='h5'>
                                    Pause Time: {formatTimeToHHMMSS(pauseProductionTimer)}
                                  </Typography>
                                ) : null}
                              </>
                            )}
                          </Box>
                          <Box display='flex' gap={2} flexWrap='wrap' sx={{ width: '100%' }}>
                            {isDownClick ? (
                              <>
                                <Button variant='contained' color='error' onClick={handleDownTimeEnd}>
                                  End Downtime
                                </Button>
                                {/*<Button variant="contained" color="error" onClick={handleStopClickOpen}>*/}
                                {/*  Stop Production*/}
                                {/*</Button>*/}
                              </>
                            ) : (
                              <>
                                {!makeTimerRunning &&
                                  !productionTimerRunning &&
                                  !pauseProductionTimer &&
                                  !isMakeTimeDone && (
                                    <Button
                                      variant='contained'
                                      onClick={handleMakeConfirmationOpen}
                                      sx={{ bgcolor: 'blue' }}
                                    >
                                      Make Ready Time
                                    </Button>
                                  )}

                                {makeTimerRunning && !productionTimerRunning && (
                                  <Button variant='contained' color='success' onClick={handleProdConfirmationOpen}>
                                    Start Production
                                  </Button>
                                )}

                                {productionTimerRunning && (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: { md: 'column', xs: 'column' }, // Both directions for md and xs are column, but we will handle their alignment separately.
                                      width: '100%',
                                      justifyContent: 'flex-start',
                                      alignItems: 'center',
                                      gap: 2
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 2,
                                        width: '100%',
                                        flexDirection: { md: 'row', xs: 'column' }
                                      }}
                                    >
                                      <Button
                                        variant='contained'
                                        color='warning'
                                        onClick={handlePauseClickOpen}
                                        sx={{ flex: 1 }}
                                      >
                                        Pause Production
                                      </Button>
                                      <Button
                                        variant='contained'
                                        color='error'
                                        onClick={handleDownClickOpen}
                                        sx={{ flex: 1 }}
                                      >
                                        Downtime Production
                                      </Button>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: 2,
                                        width: '100%',
                                        flexDirection: { md: 'row', xs: 'column' }

                                        // width: '100%', display: 'flex', justifyContent: 'flex-start'
                                      }}
                                    >
                                      <Button
                                        variant='contained'
                                        color='error'
                                        onClick={handleBreakProduction}
                                        sx={{ flex: 1 }}
                                      >
                                        Job Break
                                      </Button>
                                      <Button
                                        sx={{ flex: 1 }}
                                        variant='contained'
                                        color='success'
                                        onClick={handleStopClickOpen}
                                      >
                                        Complete Production
                                      </Button>
                                    </Box>
                                  </Box>

                                  // <Box sx={{
                                  //   display: 'flex',
                                  //   width:'100%',
                                  //   flexDirection:{md:'row', xs:'column'},
                                  //   justifyContent: 'space-between',
                                  //   alignItems: 'flex-start',
                                  //   gap: 3,
                                  //   bgcolor:'red'
                                  // }}>
                                  //
                                  //   <Button variant="contained" color="warning" onClick={handlePauseClickOpen}>
                                  //     Pause Production
                                  //   </Button>
                                  //   <Button variant="contained" color="error" onClick={handleDownClickOpen}>
                                  //     Downtime Production
                                  //   </Button>
                                  //   <Button variant="contained" color="success"
                                  //
                                  //     // disabled={!isLastRoute}
                                  //
                                  //           onClick={handleStopClickOpen}>
                                  //     Complete Production
                                  //   </Button>
                                  // </Box>
                                )}

                                {!productionTimerRunning && pauseProductionTimer ? (
                                  <Button variant='contained' color='warning' onClick={handleResumeProduction}>
                                    Resume Production
                                  </Button>
                                ) : null}
                              </>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
                      <Table size='small'>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ width: '40%' }}>
                              <strong>Production No:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail.productionOrderNo}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Production Code:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.itemCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Production Name:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.prodName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>FG Planned Quantity:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.plannedQty}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>UPS:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.U_UPS}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Customer Code:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.cardCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Customer Name:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.cardName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Sales Order:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.OriginNum}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { md: 'column', xs: 'column' },
                        width: '100%',
                        mt: 5,
                        p: 5,
                        alignItems: 'center',
                        gap: 3
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant='body2'>Total Issue For Machine:</Typography>
                        <Typography variant='body2'>{productionOrderDetail?.totalIssueForMachie}</Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant='body2'>Total Completed Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail?.totalCompletedQuantity}</Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant='body2'>Total Wasted Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail?.totalWastedQuantity}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ flex: 1, boxShadow: '0 4px 20px skyblue', pb: 10 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 3,
                        justifyContent: 'flex-start',
                        flexDirection: { md: 'row', xs: 'column' },
                        width: '100%',
                        mt: 10
                      }}
                    >
                      <Button variant='contained' sx={{ bgcolor: 'blue' }} onClick={handleClickOpen}>
                        Received Quantity
                      </Button>
                      <Button
                        variant='contained'
                        disabled={handleDisable}
                        color='warning'
                        onClick={handleClickIssueForMachineOpen}
                      >
                        Issue For Machine
                      </Button>
                      {/*<Button variant="contained" disabled={disabled} color="error" onClick={handleWastedQtyOpen}>Add*/}
                      {/*  Wasted QTY</Button>*/}
                      {/*<Button variant="contained" disabled={disabled} color="success" onClick={handleCompletedQtyOpen}>Add*/}
                      {/*  Completed QTY</Button>*/}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 3,
                        justifyContent: 'flex-start',
                        flexDirection: { md: 'row', xs: 'column' },
                        width: '100%',
                        mt: 3,
                        mb: 15
                      }}
                    >
                      <Button variant='contained' disabled={handleDisable} color='error' onClick={handleWastedQtyOpen}>
                        Wasted Quantity
                      </Button>
                      <Button
                        variant='contained'
                        disabled={disabled || handleDisable}
                        color='success'
                        onClick={handleCompletedQtyOpen}
                      >
                        Completed Quantity
                      </Button>
                    </Box>
                    <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
                      <Table size='small'>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ width: '40%' }}>
                              <strong>Sheet Code:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.ComponentItemCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Sheet Name:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.ComponentItemName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Planned Quantity:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.ComponentPlannedQty}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ width: '50%' }}>
                              <strong>Transferred Quantity From Store:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.productionOrderDataId?.TransferredQuantity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ width: '50%' }}>
                              <strong>Received By Operator:</strong>
                            </TableCell>
                            <TableCell>{productionOrderDetail?.recievedByOperator}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ width: '50%' }}>
                              <strong>Remaining Quantity:</strong>
                            </TableCell>
                            <TableCell>{remainingQty}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ width: '50%' }}>
                              <strong>Previous Route Completed Quantity:</strong>
                            </TableCell>
                            <TableCell>{previousRouteCompletedQuantity}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { md: 'column', xs: 'column' },
                        width: '100%',
                        mt: 5,
                        p: 5,
                        alignItems: 'center',
                        gap: 3
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant='body2'>Current Pallate No:</Typography>
                        <Typography variant='body2'>{productionOrderDetail?.currentPallateNo}</Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant='body2'>Issue For Machine:</Typography>
                        <Typography variant='body2'>{productionOrderDetail?.issueForMachine}</Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant='body2'>Completed Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail?.completedQuantity}</Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
                      >
                        <Typography variant='body2'>Wasted Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail?.wastedQuantity}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
          {/* Dialog for Adding recived by operator */}
          <React.Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <form onSubmit={formik.handleSubmit}>
                <DialogTitle id='alert-dialog-title'>{'Recieve by operator'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      label='Add'
                      variant='filled'
                      sx={{ my: 4, width: '100%' }}
                      placeholder='Add '
                      name='recievedByOperator'
                      type='number'
                      error={Boolean(formik.touched.recievedByOperator && formik.errors.recievedByOperator)}
                      helperText={formik.touched.recievedByOperator && formik.errors.recievedByOperator}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.recievedByOperator}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>cancel</Button>
                  <Button type='submit' onClick={handleClose} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>
          {/*</Box>*/}
          {/* Dialog for Adding Issuse for machine */}
          <React.Fragment>
            <Dialog
              open={issueForMachine}
              onClose={handleIssueForMachineClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <form onSubmit={issueFormik.handleSubmit}>
                <DialogTitle id='alert-dialog-title'>{'Add Issue For Machine'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      variant='filled'
                      sx={{ my: 4, width: '100%' }}
                      label='Pallete No'
                      name='palleteNo'
                      type='text'
                      disabled={productionOrderDetail}
                      value={productionOrderDetail?.currentPallateNo}
                    />
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      variant='filled'
                      sx={{ my: 4, width: '100%' }}
                      label='Add Issue For Machine'
                      placeholder='Add '
                      name='issueForMachine'
                      type='number'
                      error={Boolean(issueFormik.touched.issueForMachine && issueFormik.errors.issueForMachine)}
                      helperText={issueFormik.touched.issueForMachine && issueFormik.errors.issueForMachine}
                      onBlur={issueFormik.handleBlur}
                      onChange={issueFormik.handleChange}
                      value={issueFormik.values.issueForMachine}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleIssueForMachineClose}>cancel</Button>
                  <Button type='submit' onClick={handleIssueForMachineClose} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>

          {/* Dialog for completed Qty */}
          <React.Fragment>
            <Dialog
              open={completedCty}
              onClose={handleCompletedQtyClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <form onSubmit={completeFormik.handleSubmit}>
                <DialogTitle id='alert-dialog-title'>{'Add Completed Quantity'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      variant='filled'
                      sx={{ my: 4, width: '100%' }}
                      label='Add'
                      placeholder='Add '
                      name='completedQuantity'
                      type='number'
                      error={Boolean(
                        completeFormik.touched.completedQuantity && completeFormik.errors.completedQuantity
                      )}
                      helperText={completeFormik.touched.completedQuantity && completeFormik.errors.completedQuantity}
                      onBlur={completeFormik.handleBlur}
                      onChange={completeFormik.handleChange}
                      value={completeFormik.values.completedQuantity}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCompletedQtyClose}>cancel</Button>
                  <Button type='submit' onClick={handleCompletedQtyClose} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>
          {/* Dialog for wasted Qty */}
          <React.Fragment>
            <Dialog
              open={wastedQty}
              onClose={handleWastedQtyClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <form onSubmit={wastedFormik.handleSubmit}>
                <DialogTitle id='alert-dialog-title'>{'Add Wasted Quantity'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      variant='filled'
                      sx={{ my: 4, width: '100%' }}
                      label='Add'
                      placeholder='Add '
                      name='wastedQuantity'
                      type='number'
                      error={Boolean(wastedFormik.touched.wastedQuantity && wastedFormik.errors.wastedQuantity)}
                      helperText={wastedFormik.touched.wastedQuantity && wastedFormik.errors.wastedQuantity}
                      onBlur={wastedFormik.handleBlur}
                      onChange={wastedFormik.handleChange}
                      value={wastedFormik.values.wastedQuantity}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleWastedQtyClose}>cancel</Button>
                  <Button type='submit' onClick={handleWastedQtyClose} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>
          {/* Dialog for pause pop up */}
          <React.Fragment>
            <Dialog
              open={pausePopUp}
              onClose={handlePauseClickClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <form onSubmit={pauseFormik.handleSubmit}>
                <DialogTitle id='alert-dialog-title'>Add Pause Reason</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    {/* Select Field */}
                    <FormControl component='fieldset' sx={{ my: 2 }}>
                      <FormLabel component='legend'>Select Pause Reason</FormLabel>
                      <RadioGroup
                        name='pauseReason'
                        value={pauseFormik.values.pauseReason}
                        onChange={e => {
                          pauseFormik.handleChange(e)
                          setShowCustomReason(e.target.value === 'Other')
                        }}
                        onBlur={pauseFormik.handleBlur}
                      >
                        <FormControlLabel value='Roller Change' control={<Radio />} label='Roller Change' />
                        <FormControlLabel value='Blanket Change' control={<Radio />} label='Blanket Change' />
                        <FormControlLabel value='Packing Change' control={<Radio />} label='Packing Change' />
                        <FormControlLabel value='Other' control={<Radio />} label='Other' />
                      </RadioGroup>
                      {pauseFormik.touched.pauseReason && pauseFormik.errors.pauseReason && (
                        <FormHelperText error>{pauseFormik.errors.pauseReason}</FormHelperText>
                      )}
                    </FormControl>

                    {showCustomReason && (
                      <TextField
                        multiline
                        fullWidth
                        variant='filled'
                        rows={4}
                        sx={{ my: 2 }}
                        label='Specify other reason'
                        placeholder='Type custom reason'
                        name='customPauseReason'
                        type='text'
                        onBlur={pauseFormik.handleBlur}
                        onChange={pauseFormik.handleChange}
                        value={pauseFormik.values.customPauseReason}
                        error={Boolean(pauseFormik.touched.customPauseReason && pauseFormik.errors.customPauseReason)}
                        helperText={pauseFormik.touched.customPauseReason && pauseFormik.errors.customPauseReason}
                      />
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlePauseClickClose}>Cancel</Button>
                  <Button type='submit' onClick={handlePauseClickClose} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>

          {/* Dialog for downtime pop up */}
          <React.Fragment>
            <Dialog
              open={downPopUp}
              onClose={handleDownClickClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <form onSubmit={downFormik.handleSubmit}>
                <DialogTitle id='alert-dialog-title'>Add Down Reason</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    {/* Select Field */}
                    <FormControl component='fieldset' sx={{ my: 2 }}>
                      <FormLabel component='legend'>Select Down Time Reason</FormLabel>
                      <RadioGroup
                        name='downReason'
                        value={downFormik.values.downReason}
                        onChange={e => {
                          downFormik.handleChange(e)
                          setShowCustomReason(e.target.value === 'Other')
                        }}
                        onBlur={downFormik.handleBlur}
                      >
                        <FormControlLabel value='Board Waiting' control={<Radio />} label='Board Waiting' />
                        <FormControlLabel value='Ink Waiting' control={<Radio />} label='Ink Waiting' />
                        <FormControlLabel value='Plates Waiting' control={<Radio />} label='Plates Waiting' />
                        <FormControlLabel value='Electricity Problem' control={<Radio />} label='Electricity Problem' />
                        <FormControlLabel value='Mechanical Problem' control={<Radio />} label='Mechanical Problem' />
                        <FormControlLabel value='Electricity Off' control={<Radio />} label='Electricity Off' />
                        <FormControlLabel value='Other' control={<Radio />} label='Other' />
                      </RadioGroup>
                      {downFormik.touched.downReason && downFormik.errors.downReason && (
                        <FormHelperText error>{downFormik.errors.downReason}</FormHelperText>
                      )}
                    </FormControl>

                    {showCustomReason && (
                      <TextField
                        multiline
                        fullWidth
                        variant='filled'
                        rows={4}
                        sx={{ my: 2 }}
                        label='Specify other reason'
                        placeholder='Type custom reason'
                        name='customDownReason'
                        type='text'
                        onBlur={downFormik.handleBlur}
                        onChange={downFormik.handleChange}
                        value={downFormik.values.customDownReason}
                        error={Boolean(downFormik.touched.customDownReason && downFormik.errors.customDownReason)}
                        helperText={downFormik.touched.customDownReason && downFormik.errors.customDownReason}
                      />
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDownClickClose}>Cancel</Button>
                  <Button type='submit' onClick={handleDownClickClose} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>

          {/* Dialog for stop production */}
          <React.Fragment>
            <Dialog
              open={stopPopUp}
              onClose={handleStopClickClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <form onSubmit={stopFormik.handleSubmit}>
                <DialogTitle id='alert-dialog-title'>{'Add Image For Stop Production'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    <TextField
                      required
                      fullWidth
                      variant='filled'
                      sx={{ my: 4, width: '100%' }}
                      name='images'
                      type='file'
                      accept='image/*'
                      id='images'
                      error={Boolean(stopFormik.touched.images && stopFormik.errors.images)}
                      helperText={stopFormik.touched.images && stopFormik.errors.images}
                      onBlur={stopFormik.handleBlur}
                      onChange={handleImage}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleStopClickClose}>cancel</Button>
                  <Button type='submit' autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>
          {/* Dialog for make ready time */}
          <React.Fragment>
            <Dialog
              open={makeReadyTimePopUp}
              onClose={handleMakeConfirmationClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'Start Make Ready Time'}</DialogTitle>
              <DialogContent>
                <Typography>Are you sure you want to start make ready time?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleMakeConfirmationClose}>No</Button>
                <Button
                  autoFocus
                  onClick={() => {
                    handleStartMakeTime()
                    handleMakeConfirmationClose()
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
          {/* Dialog for start production time */}
          <React.Fragment>
            <Dialog
              open={productionTimePopUp}
              onClose={handleProdConfirmationClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'Start Production Time'}</DialogTitle>
              <DialogContent>
                <Typography>Are you sure you want to start production time?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleProdConfirmationClose}>No</Button>
                <Button
                  autoFocus
                  onClick={() => {
                    handleStartProduction()
                    handleProdConfirmationClose()
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </>
      )}
    </Grid>
  )
}

export default ProductOrderDetail
