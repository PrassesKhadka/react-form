// Paginate data with query cursors -> split data returned by a query into batches according to the parameters you define in your query.
// Query cursors define the start and end points for a query
// Example of query cursor:
// Reference: https://firebase.google.com/docs/firestore/query-data/aggregation-queries#:~:text=Web%20method%20names.-,Use%20the%20count()%20aggregation,in%20a%20collection%20or%20query.
// and https://firebase.google.com/docs/firestore/query-data/query-cursors and https://www.youtube.com/watch?v=Lz8MJ9VzXZ8
// and for query: https://firebase.google.com/docs/firestore/query-data/order-limit-data
//   const entityObject = {
//     collection: "students",
//     records_limit: PAGE_SIZE,
//     // pageaction -> next page,previous page
//     // pageAction: pageAction,
//     page: page,
//     // fields i want to retrieve
//     fields: {
//       subject:true,
//       studentData: true,
//     },
//     orderByField: "created_at",
//     orderByOrder: "desc",
//     // after or previous particular cursor
//     lastIndex: afterThis,
//     firstIndex: beforeThis,
//     whereFields: [
//       {
//         name: "entity_type",
//         value: "GROUP",
//       },
//       {
//         name: "entity_id",
//         value: "id",
//       },
//     ],
//   };
import {
  CollectionReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useState, useEffect, useRef, useMemo } from "react";
import { db } from "../firebase/initialize";
import { Istudent, IuserDocument } from "../interfaces";

interface IwhereFields {}
// for database query
export interface IentityObject {
  collectionName: string;
  //  Number of items/records per page
  items_perPage?: number;
  // limit that you want to introduce to retrieve limited records
  items_limit?: number;
  // pageaction -> next page,previous page
  // pageAction: pageAction,
  //   page: page;
  // fields i want to retrieve
  fields?: {
    studentData: true;
  };
  orderByField?: string;
  orderByOrder?: "desc" | "asc";
  // after or previous cursor
  lastIndex?: "afterThis" | "beforeThis";
  firstIndex?: "afterThis" | "beforeThis";
  whereFields?: [
    {
      name: "entity_type";
      value: "GROUP";
    },
    {
      name: "entity_id";
      value: "id";
    }
  ];
}

// Pagination
export default function usePagination(entityObject: IentityObject) {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageAction, setPageAction] = useState<"NEXT" | "PREVIOUS">();
  const [pageData, setPageData] = useState<IuserDocument[]>([]);
  // last visible data of the current page
  const [lastIndex, setLastIndex] = useState<any>();
  // first visible data of the previous page
  const [firstIndex, setFirstIndex] = useState<any>();

  useEffect(() => {
    const func = async () => {
      await getTotalPages();
    };
    func();
  }, []);

  // once page change fetch data on that page
  useEffect(() => {
    if (pageAction === "PREVIOUS") return;
    const fetchData = async () => {
      const data = await fetchPaginatedData();
      const list: IuserDocument[] = [];
      data?.forEach((eachDoc) => {
        list.push({
          id: eachDoc.id,
          ...eachDoc.data(),
        } as IuserDocument);
      });
      setPageData(list);
    };
    fetchData();
  }, [page]);

  const {
    collectionName,
    items_perPage = 5,
    items_limit,
    // if orderByField and orderByOrder not passed then by default, these values
    orderByField = "createdAt",
    orderByOrder = "desc",
  } = entityObject;

  // Total number of records in that page
  const ITEMS_PER_PAGE = items_perPage;
  // page index 1,2,3....N this N is PAGE_SIZE
  const collectionRef = collectionReference() as CollectionReference;

  // Query the first page of docs,initially
  let queryRef = useRef(
    query(
      collectionRef,
      orderBy(orderByField, orderByOrder),
      limit(ITEMS_PER_PAGE)
    )
  );

  function collectionReference(): CollectionReference | undefined {
    const collectionRef = collection(db, collectionName);
    if (!collectionRef) return;
    return collectionRef;
  }

  async function getTotalNumberOfDocsInCollection(): Promise<
    number | undefined
  > {
    const collectionRef = collectionReference();
    if (!collectionRef) return;
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  }

  // This is called in useEffect
  async function getTotalPages() {
    const totalCount = await getTotalNumberOfDocsInCollection();
    if (!totalCount) return;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    setTotalPages((prev) => (prev = totalPages));
  }

  function next() {
    if (page != totalPages) {
      setPage((prev) => prev + 1);
      setPageAction((prev) => (prev = "NEXT"));
      console.log(page);
    }
    return;
  }

  function previous() {
    if (page != 1) {
      setPage((prev) => prev - 1);
      setPageAction((prev) => (prev = "PREVIOUS"));
    }
    return;
  }

  function goTo(index: number) {
    if (index >= 1 && index <= totalPages) setPage((prev) => (prev = index));
    return;
  }

  async function fetchPaginatedData() {
    if (!collectionRef) return;

    let querySnapshots = await getDocs(queryRef.current);

    // Get the first visible document
    let firstVisible = querySnapshots.docs[0];
    setFirstIndex(firstVisible);
    // Get the last visible document
    let lastVisible = querySnapshots.docs[querySnapshots.docs.length - 1];
    setLastIndex(lastVisible);

    if (page > 1) {
      if (pageAction === "NEXT") {
        // Construct a new query starting at this document,
        // get the next 25 cities.

        queryRef.current = query(
          collectionRef,
          orderBy(orderByField, orderByOrder),
          startAfter(lastIndex),
          limit(ITEMS_PER_PAGE)
        );
        console.log("next clicked");
        querySnapshots = await getDocs(queryRef.current);
        lastVisible = querySnapshots.docs[querySnapshots.docs.length - 1];
        setLastIndex(lastVisible);
      } else if (pageAction === "PREVIOUS") {
        queryRef.current = query(
          collectionRef,
          orderBy(orderByField, orderByOrder),
          startAfter(firstIndex),
          limit(ITEMS_PER_PAGE)
        );
        console.log(querySnapshots);
      }
    }

    return querySnapshots.docs;
  }

  return { previous, next, goTo, totalPages, pageData };
}
