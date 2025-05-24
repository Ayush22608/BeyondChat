'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const customers = [
  {
    id: 1,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    company: 'Acme Inc',
    status: 'Active',
    lastSeen: '2 minutes ago',
    conversations: 12,
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    company: 'TechCorp',
    status: 'Active',
    lastSeen: '1 hour ago',
    conversations: 8,
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    company: 'StartupX',
    status: 'Inactive',
    lastSeen: '3 days ago',
    conversations: 5,
  },
]

export default function CustomersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'view' | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState('');

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all customers in your account including their name, email, company, and status.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2 transition-all duration-150"
              onClick={() => { setModalType('add'); setModalOpen(true); }}
            >
              <PlusIcon className="h-5 w-5" /> Add customer
            </button>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm transition-all duration-200">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-all duration-150" onClick={() => setModalOpen(false)}><XMarkIcon className="h-6 w-6" /></button>
              {modalType === 'add' && (
                <div>
                  <h2 className="text-lg font-bold mb-4">Add Customer</h2>
                  <form className="space-y-4">
                    <input className="w-full border rounded px-3 py-2" placeholder="Name" disabled value="Dummy Name" />
                    <input className="w-full border rounded px-3 py-2" placeholder="Email" disabled value="dummy@email.com" />
                    <input className="w-full border rounded px-3 py-2" placeholder="Company" disabled value="Dummy Company" />
                    <button type="button" className="w-full bg-indigo-600 text-white rounded px-3 py-2 font-semibold" onClick={() => setModalOpen(false)}>Save (Dummy)</button>
                  </form>
                </div>
              )}
              {modalType === 'view' && selectedCustomer && (
                <div>
                  <h2 className="text-lg font-bold mb-4">Customer Details</h2>
                  <div className="mb-2"><b>Name:</b> {selectedCustomer.name}</div>
                  <div className="mb-2"><b>Email:</b> {selectedCustomer.email}</div>
                  <div className="mb-2"><b>Company:</b> {selectedCustomer.company}</div>
                  <div className="mb-2"><b>Status:</b> {selectedCustomer.status}</div>
                  <div className="mb-2"><b>Last Seen:</b> {selectedCustomer.lastSeen}</div>
                  <button type="button" className="mt-4 w-full bg-indigo-600 text-white rounded px-3 py-2 font-semibold" onClick={() => setModalOpen(false)}>Close</button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-150"
                  placeholder="Search customers..."
                />
                {search && (
                  <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-150" onClick={() => setSearch('')}><XMarkIcon className="h-5 w-5" /></button>
                )}
              </div>

              <div className="overflow-hidden shadow-xl ring-1 ring-black ring-opacity-5 sm:rounded-2xl bg-white p-2">
                <table className="min-w-full divide-y divide-gray-300 rounded-2xl overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-base font-extrabold text-gray-900 sm:pl-6">Name</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-base font-extrabold text-gray-900">Company</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-base font-extrabold text-gray-900">Status</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-base font-extrabold text-gray-900">Last Seen</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-base font-extrabold text-gray-900">Conversations</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.map((customer, idx) => (
                      <tr key={customer.id} className={`transition-all duration-150 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50/60`}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">
                                  {customer.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{customer.name}</div>
                              <div className="text-gray-500">{customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{customer.company}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                              customer.status === 'Active'
                                ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                                : 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20'
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{customer.lastSeen}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{customer.conversations}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => { setSelectedCustomer(customer); setModalType('view'); setModalOpen(true); }}
                          >
                            View<span className="sr-only">, {customer.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 