import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface DashboardProps {
    className?: string
}

const Dashboard: FC<DashboardProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>Dashboard</div>
})

export default Dashboard
