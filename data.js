export const initialData = {
  id: 'root',
  label: 'Company Root',
  isRoot: true,
  metadata: { role: 'CEO', department: 'Executive' },
  children: [
    {
      id: 'c1',
      label: 'Engineering',
      metadata: { role: 'VP of Eng', department: 'Engineering' },
      children: [
        { id: 'c1-1', label: 'Frontend Team', metadata: { role: 'Lead', count: 5 } },
        { id: 'c1-2', label: 'Backend Team', metadata: { role: 'Lead', count: 8 } },
        { id: 'c1-3', label: 'DevOps', metadata: { role: 'Manager', count: 3 } }
      ]
    },
    {
      id: 'c2',
      label: 'Design',
      metadata: { role: 'VP of Design', department: 'Design' },
      children: [
        { id: 'c2-1', label: 'UX Research', metadata: { role: 'Lead', count: 2 } },
        { id: 'c2-2', label: 'UI Design', metadata: { role: 'Lead', count: 4 } }
      ]
    },
    {
      id: 'n1',
      label: 'Marketing',
      metadata: { role: 'CMO', department: 'Marketing' }
    },
    {
      id: 'n2',
      label: 'Sales',
      metadata: { role: 'VP of Sales', department: 'Sales' },
      children: [
        { id: 'n2-1', label: 'Enterprise', metadata: { role: 'Director', count: 10 } }
      ]
    },
    {
      id: 'n3',
      label: 'HR',
      metadata: { role: 'Director', department: 'Human Resources' }
    },
    {
      id: 'n4',
      label: 'Legal',
      metadata: { role: 'General Counsel', department: 'Legal' }
    }
  ]
};
