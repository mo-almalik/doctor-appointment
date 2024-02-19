import { useState } from 'react'
import { Tab } from '@headlessui/react'

export default function Table() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return <>
     <Tab.Group manual >
      <Tab.List className='bg-main'>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </>
}

