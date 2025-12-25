import { useEffect, useState } from 'react'
import { mockApplications } from './data/mockApplications';
import type { Application, Status } from "./types/application";
import Header from './Header';


const STORAGE_KEY = "job-tracker-apps";


export default function App() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL")



  const [editingID, setEditingID] = useState<string | null>(null)

  function handleEditClick(app: Application) {
    setEditingID(app.id)
    setDraft({ company: app.company, role: app.role, status: app.status })
    setIsOpen(true)
  }

  function handleDelete(id: string) {
    if (!confirm("Silmek istediğine emin misin?")) return;
    setApp((prev) => prev.filter((a) => (a.id !== id)))
  }

  const columns = [
    { title: "Wishlist", status: "WISHLIST" },
    { title: "Applied", status: "APPLIED" },
    { title: "Interview", status: "INTERVIEW" },
    { title: "Offer", status: "OFFER" },
    { title: "Rejected", status: "REJECTED" },
  ] as const;

  const [app, setApp] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockApplications;

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : mockApplications;
    } catch {
      return mockApplications;
    }
  });


  const q = query.trim().toLocaleLowerCase();

  const visibleApps = app.filter((a) => {
    const matchesQuery = q === "" || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;

    return matchesQuery && matchesStatus
  })

  const [isOpen, setIsOpen] = useState(false)

  function toggleAddApplication() {
    setIsOpen((prev) => !prev)
  }

  const [draft, setDraft] = useState({
    company: "",
    role: "",
    status: "APPLIED" as Status,
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
  }, [app]);
  return (
    <>
      <div className="min-h-screen text-white pt-20  bg-[#27292c] pb-50" >
        <Header />

        <div className='mt-8  mb-5 flex justify-center'>
          <input
            placeholder='Seacrh...'

            className='rounded-2xl pl-4  mr-2 shadow-md ring-1 ring-amber-50        focus:outline-none
      focus:ring-2 focus:ring-blue-500'
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} />
          <div className="relative inline-block">

            <select
              className='shadow-md rounded-xl     
                        appearance-none
                        bg-[#27292c]
                        border border-gray-300
                        px-4 py-2 pr-10
                        text-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-[#27292c]
                        focus:border-blue-500
                        hover:border-gray-400
                        transition'
              name="search"
              id="seacrh"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | "ALL")}
            >

              <option value="ALL">ALL</option>
              {columns.map((c) => (
                <option key={c.status} value={c.status}>
                  {c.title}
                </option>
              ))}

            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

        </div>
        {isOpen ?
          <>
            <div className='text-center'>
              <button
                onClick={toggleAddApplication}
                className='pl-4 pr-4 pt-2 pb-2  text-white bg-blue-500 shadow-lg shadow-blue-500/50 rounded-md mt-10 '>Close x</button>
            </div>
            <div className='flex justify-center   m-10'>

              <form

                className="flex flex-col p-8 rounded-2xl shadow-lg shadow-amber-50/15 max-w-87 gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("submitted");

                  if (draft.company.trim() !== "" && draft.role.trim() !== "") {
                    if (editingID === null) {


                      const newItem = {
                        id: crypto.randomUUID(),
                        company: draft.company,
                        role: draft.role,
                        status: draft.status,
                        dateApplied: new Date().toISOString()



                      }
                      console.log(" if submitted");
                      setApp((prev) => [newItem, ...prev])
                      setDraft({ company: "", role: "", status: "APPLIED" })
                      setIsOpen(false)
                    }
                    else {
                      setApp(prev => prev.map((a) => (a.id === editingID ? { ...a, company: draft.company, role: draft.role, status: draft.status } : a)))

                    }
                    setEditingID(null)
                    setIsOpen(false)
                    setDraft({ company: "", role: "", status: "APPLIED" })
                  }
                }
                }
              >
                <label className='mb-5'>{editingID ? "Edit Application" : "Add Application"}</label>
                <label>Company</label>
                <input
                  type="text"
                  value={draft.company}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, company: e.target.value }))
                  }
                  className=" rounded-lg pl-2  px-3 py-1  mr-2 shadow-md ring-1 ring-amber-50        focus:outline-none
      focus:ring-2 focus:ring-blue-500"
                />

                <label>Role</label>
                <input
                  type="text"
                  value={draft.role}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className=" rounded-lg pl-2 px-3 py-1   mr-2 shadow-md ring-1 ring-amber-50        focus:outline-none
      focus:ring-2 focus:ring-blue-500 "
                />

                <label>Status</label>
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, status: e.target.value as Status }))
                  }
                  className="  
                  shadow-md rounded-xl     
                        appearance-none
                        bg-[#27292c]
                        border border-gray-300
                        px-4 py-2 pr-10
                        text-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500
                        hover:border-gray-400
                        transition
                  "
                >
                  {columns.map((c) => (
                    <option key={c.status} value={c.status}>
                      {c.title}
                    </option>
                  ))}
                </select>

                <button
                  className="text-white rounded-sm bg-blue-500 shadow-lg shadow-blue-500/50  py-2 text-lg font-bold  mt-2"
                  type="submit"
                >
                  Submit
                </button>
              </form>

            </div>
          </>
          :
          <div className='text-center'>
            <button
              onClick={toggleAddApplication}
              className='pl-4 pr-4 pt-2 pb-2 text-white  bg-blue-500 shadow-lg shadow-blue-500/50 rounded-md mt-10 mb-10'>Add Application +</button>
          </div>}


        <div className="flex gap-6 justify-center">

          {columns.map(
            (col) => {
              const filteredApps = visibleApps.filter(
                (app) => app.status === col.status
              ); return (
                <div key={col.status} className="min-w-55 shadow-lg shadow-amber-50/15 mt-5 border border-[#3a3a3a18] rounded-xl p-3">
                  <h3 className='font-bold'>{col.title} ({filteredApps.length})</h3>
                  <div className="mt-5 bg ">
                    <div>
                      {
                        filteredApps.length === 0 && <div>No Applications...</div>
                      }
                    </div>


                    {filteredApps.map((app) => (
                      <div key={app.id} className='border shadow-lg   border-[#aeaeb422] rounded-lg p-2 mt-3'>
                        <div className="font-semibold">{app.company}</div>
                        <div className="text-sm opacity-50">{app.role}</div>
                        <div className="text-sm">{new Date(app.dateApplied).toLocaleDateString()}</div>


                        <div className="relative mt-2 ">
                          <select
                            name="status"
                            value={app.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as Status;
                              setApp((prev) =>
                                prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
                              );
                            }}
                            className="
                            w-full  appearance-none
                            bg-[#27292c]  text-white
                            border border-gray-300  shadow-md  rounded-xl  px-4 py-2 pr-10
                            text-sm leading-6
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500 hover:border-gray-400 transition
                          "
                          >
                            {columns.map((c) => (
                              <option key={c.status} value={c.status}>
                                {c.title}
                              </option>
                            ))}
                          </select>

                          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                            <svg
                              className="h-4 w-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>


                        <div className='flex justify-center'>

                          <button onClick={() => (handleEditClick(app))} className=' flex  pl-4 pr-4 pt-2 pb-2 text-white  bg-blue-500 shadow-lg shadow-blue-500/50 rounded-md mt-3 mb-1 mr-3'>Edit</button>

                          <button onClick={() => (handleDelete(app.id))} className=' flex  pl-4 pr-4 pt-2 pb-2 text-white  bg-red-500 shadow-lg shadow-red-500/50 rounded-md mt-3 mb-1'>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          )}

        </div>
      </div>
    </>
  )
}