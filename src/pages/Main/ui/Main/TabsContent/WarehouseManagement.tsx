import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface WarehouseManagementProps {
    className?: string
}

const WarehouseManagement: FC<WarehouseManagementProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>WarehouseManagement</div>
})

export default WarehouseManagement
