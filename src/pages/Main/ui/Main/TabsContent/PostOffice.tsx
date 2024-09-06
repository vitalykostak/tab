import { memo, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'

interface PostOfficeProps {
    className?: string
}

const PostOffice: FC<PostOfficeProps> = memo(props => {
    const { className } = props

    const mods = {}

    const additionsClasses = [className]

    return <div className={classNames('', mods, additionsClasses)}>PostOffice</div>
})

export default PostOffice
