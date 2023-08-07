import { PlusOutlined } from '@ant-design/icons'
import { UseCreateCustomer, UseDeleteCustomer, UseEditCustomer, UseGetCustomer } from '@src/apis'
import { CustomerTable } from '@src/molecules/customer'
import CreateCustomerModal, { CreateCustomerModalRef } from '@src/molecules/customer/CreateCustomerModal'
import { CreateCustomerProps, ICustomer, UpdateCustomerType } from '@src/types'
import { FloatButton, Table, message } from 'antd'
import { useCallback, useRef } from 'react'

const Customer = () => {
    const { data, isLoading, refetch } = UseGetCustomer()
    const createcustomarmodal = useRef<CreateCustomerModalRef>(null)

    const { mutateAsync: editCustomer, isLoading: editloading } = UseEditCustomer()
    const { mutateAsync: createCustomer, isLoading: createloading } = UseCreateCustomer()
    const { mutateAsync: deleteCustomer } = UseDeleteCustomer()

    const OncreateCustomer = useCallback(async (v: CreateCustomerProps) => {
        await createCustomer(v, {
            onSuccess: () => {
                message.success("Customer sucesssfully created")
                refetch()
            }
        })
    }, [createCustomer, refetch])

    const OnEdtitCustomer = useCallback(async (v: UpdateCustomerType) => {
        console.log(v)
        await editCustomer(v, {
            onSuccess: () => {
                message.success("Customer Edit Sucessfully")
                refetch()
            }
        })
    }, [editCustomer, refetch])

    const OndeleteCustomer = useCallback(async (id: string) => {
        await deleteCustomer({ id }, {
            onSuccess: () => {
                refetch()
                message.success("product deleted sucesfully")
            },
            onError: () => {
                message.error("something went wrong")
            }
        })
    }, [deleteCustomer, refetch])

    const OnOpenCreateModal = () => createcustomarmodal.current?.open()

    const onEdit = useCallback(async (props: ICustomer) => {
        console.log(props)
        await createcustomarmodal.current?.edit(props)
    }, [])

    return (
        <div className='h-[100vh]'>
            <CustomerTable
                OnDelete={OndeleteCustomer}
                data={data || []}
                onEdit={onEdit}

            />

            <CreateCustomerModal
                OnCreateCustomer={OncreateCustomer}
                createloading={createloading}
                onEditCustomer={OnEdtitCustomer}
                ref={createcustomarmodal}
            />

            <FloatButton
                onClick={OnOpenCreateModal}
                type='primary'
                icon={<PlusOutlined />}
            />

        </div>

    )
}

export default Customer