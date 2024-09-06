import { DragDropContext, Draggable, Droppable, type OnDragEndResponder } from 'react-beautiful-dnd'

import {
    VisibilityObserverChild,
    VisibilityObserverParent
} from '@/shared/lib/components/VisibilityChildObserver'
import Tab from '@/shared/ui/Tab/Tab'

import { type TabState } from '../../InteractiveTabs'
import styles from '../../InteractiveTabs.module.scss'

const TabsLine = (props: {
    tabsState: TabState[]
    handleDragEnd: OnDragEndResponder
    className: string
    onChangeVisibility?: (tabId: string) => (isVisible: boolean) => void
    selectTab: (tabId: string) => () => void
    getContextMenuItems: (tabId: string) => Array<{
        icon: string | number | boolean | JSX.Element | Iterable<React.ReactNode> | null | undefined
        label: string
        onClick: () => void
    }>
}) => {
    const {
        tabsState,
        handleDragEnd,
        className,
        onChangeVisibility,
        selectTab,
        getContextMenuItems
    } = props

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="tabs"
                direction="horizontal"
            >
                {provided => {
                    return (
                        <VisibilityObserverParent className={className}>
                            <ul
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={styles.tabsListContainer}
                            >
                                {tabsState.map(({ pinned, ...tab }, index) => (
                                    <Draggable
                                        key={tab.id}
                                        draggableId={tab.id}
                                        index={index}
                                    >
                                        {provided => {
                                            return (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <VisibilityObserverChild
                                                        onChangeVisibility={onChangeVisibility?.(
                                                            tab.id
                                                        )}
                                                    >
                                                        <Tab
                                                            {...tab}
                                                            minimizeMode={pinned}
                                                            onClick={selectTab(tab.id)}
                                                            contextMenuItems={getContextMenuItems(
                                                                tab.id
                                                            )}
                                                        />
                                                    </VisibilityObserverChild>
                                                </li>
                                            )
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        </VisibilityObserverParent>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}

export default TabsLine
