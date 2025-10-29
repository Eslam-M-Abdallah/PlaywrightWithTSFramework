import { test, expect } from "../../fixtures/hooks-fixtures";
import apiPathData from "../../test-data/api-data/api-path-data.json"
import restfulBookerApiModuleData from "../../test-data/api-data/restful-booker-api-module-data.json"

test("[Restful-booker > Booking]Verify That The User Can Fetch All The Booking IDs Using Get APi Call And Recieve Valid Response",
    {
        tag: ['@Api', '@Booking_Module', '@Demo_Env', '@Positive_Scenario'],
        annotation:
        {
            type: 'TC Link',
            description: 'Here Is The Tc Link'
        }
    }, async ({ request }) => {
        const bookingIdsResp = await request.get(apiPathData.booking_Path)
        const bookingIdsJsonResp = await bookingIdsResp.json()
        const headerArrayValues = bookingIdsResp.headersArray()
        console.log(bookingIdsJsonResp)
        expect(bookingIdsResp.status()).toBe(200)
        expect(bookingIdsResp.statusText()).toBe('OK')
        expect(bookingIdsResp.ok()).toBeTruthy()
        expect(headerArrayValues[1].value).toBe(restfulBookerApiModuleData.Content_Type)
        expect(bookingIdsJsonResp).not.toBeNull()

    })

test("[Restful-booker > Booking]Verify That The User Can Fetch Booking Details For Specific ID Using Get APi Call And Recieve Valid Response",
    {
        tag: ['@Api', '@Booking_Module', '@Demo_Env', '@Positive_Scenario'],
        annotation:
        {
            type: 'TC Link',
            description: 'Here Is The Tc Link'
        }
    }, async ({ request }) => {
        const bookingIdDetailsResp = await request.get(`${apiPathData.booking_Path}/${restfulBookerApiModuleData.Booking_Id}`)
        const bookingIdDetailsJsonResp = await bookingIdDetailsResp.json()
        console.log(bookingIdDetailsJsonResp)
        expect(bookingIdDetailsResp.status()).toBe(200)
        expect(bookingIdDetailsResp.statusText()).toBe("OK")
        expect(bookingIdDetailsResp.ok()).toBeTruthy()
        expect(bookingIdDetailsResp).not.toBeNull()
        expect(bookingIdDetailsJsonResp.firstname).toEqual(restfulBookerApiModuleData.User_First_Name)

    })

test("[Restful-booker > Booking]Verify That The User Can Create New Booking Using Post APi Call And Recieve Valid Response",
    {

        tag: ['@Api', '@Booking_Module', '@Demo_Env', '@Positive_Scenario'],
        annotation:
        {
            type: 'TC Link',
            description: 'Here Is The Tc Link'
        }
    }, async ({ request }) => {
        const createBookingResp = await request.post(apiPathData.booking_Path,
            {
                data: restfulBookerApiModuleData.Create_Booking
            })
        const createBookingJsonResp = await createBookingResp.json()
        console.log(createBookingJsonResp)
        expect(createBookingResp.status()).toBe(200)
        expect(createBookingJsonResp.booking).toMatchObject(restfulBookerApiModuleData.Create_Booking)
    })

test("[Restful-booker > Booking]Verify That The User Can Update Exist Booking Using Put APi Call And Recieve Valid Response",
    {
        tag: ['@Api', '@Booking_Module', '@Demo_Env', '@Positive_Scenario'],
        annotation:
        {
            type: 'TC Link',
            description: 'Here Is The Tc Link'
        }
    },
    async ({ request , commonAPiUtils }) => {
        const tokenVal = commonAPiUtils.createToken()
        const UpdateBookingIdResp = await request.put(`${apiPathData.booking_Path}/${restfulBookerApiModuleData.Booking_Id2}`,
            {
               headers : 
               {
                Cookie : `token=${tokenVal}`
               } ,
               data : restfulBookerApiModuleData.Update_Booking
            })
        const UpdateBookingIdJsonResp = await UpdateBookingIdResp.json()
        console.log(UpdateBookingIdJsonResp)
        expect(UpdateBookingIdResp.status()).toBe(200)
        expect(UpdateBookingIdJsonResp).toMatchObject(restfulBookerApiModuleData.Update_Booking)
        
    }
)

test("[Restful-booker > Booking]Verify That The User Can Partially Update Exist Booking Using Patch APi Call And Recieve Valid Response",
    {
        tag: ['@Api', '@Booking_Module', '@Demo_Env', '@Positive_Scenario'],
        annotation:
        {
            type: 'TC Link',
            description: 'Here Is The Tc Link'
        }
    },
    async ({ request , commonAPiUtils }) => {
        const tokenVal = await commonAPiUtils.createToken()
        const PartiallyUpdateBookingIdResp = await request.patch(`${apiPathData.booking_Path}/${restfulBookerApiModuleData.Booking_Id2}`,
            {
               headers : 
               {
                Cookie : `token=${tokenVal}`
               } ,
               data : restfulBookerApiModuleData.Partially_Upate_Booking 
            })
        const PartiallyUpdateBookingIdJsonResp = await PartiallyUpdateBookingIdResp.json()
        console.log(PartiallyUpdateBookingIdJsonResp)
        expect(PartiallyUpdateBookingIdResp.status()).toBe(200)
        expect(PartiallyUpdateBookingIdJsonResp).toMatchObject(restfulBookerApiModuleData.Partially_Updated_ID)
        expect(PartiallyUpdateBookingIdJsonResp.firstname).toMatch(restfulBookerApiModuleData.Partially_Upate_Booking.firstname)
        
    }
)

test("[Restful-booker > Booking]Verify That The User Can Delete Exist Booking ID Using Delete APi Call And Recieve Valid Response" , 
    {
        tag: ['@Api', '@Booking_Module', '@Demo_Env', '@Positive_Scenario'],
        annotation:
        {
            type: 'TC Link',
            description: 'Here Is The Tc Link'
        }
    } , async({request , commonAPiUtils})=>
    {
        const tokenVal = await commonAPiUtils.createToken()
        const deletBookingIdResp = await request.delete(`${apiPathData.booking_Path}/${restfulBookerApiModuleData.Booking_Id6}`,
            {
                headers : 
                {
                    Cookie : `token=${tokenVal}`
                }
            })
        expect(deletBookingIdResp.status()).toBe(201)
        expect(deletBookingIdResp.statusText()).toBe("Created")
        const getBookingIDResp = await request.get(`${apiPathData.booking_Path}/${restfulBookerApiModuleData.Booking_Id5}`)
        expect(getBookingIDResp.status()).toBe(404)
        expect(getBookingIDResp.statusText()).toBe("Not Found")

    })