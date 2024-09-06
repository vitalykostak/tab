import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface TelephonyProps {
    className?: string
}

const Telephony: FC<TelephonyProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>Telephony</div>
})

export default Telephony
