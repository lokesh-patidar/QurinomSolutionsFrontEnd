import React from "react";
import {
    useTable,
    usePagination,
    useSortBy,
    useGlobalFilter,
    useFilters,
} from "react-table";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Icon,
    Button,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/select";
import "../Styles/CustomTable.css";


function CustomTable({ columns, data, searchEnabled }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, globalFilter, pageSize },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const inputRef = React.useRef();


    return (
        <Box>
            {
                searchEnabled && (
                    <Box mb={"20px"}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input
                                ref={inputRef}
                                type="text"
                                value={globalFilter || ""}
                                onChange={(e) => {
                                    setGlobalFilter(e.target.value || undefined);
                                }}
                                placeholder={`Search...`}
                                width={{ base: '100%', md: '50%' }}
                                border='1px solid #a3a3a2'
                            />
                            {
                                globalFilter && (
                                    <InputRightElement
                                        cursor={"pointer"}
                                        children={
                                            <CloseIcon
                                                fontSize={14}
                                                _hover={{ color: "gray.600" }}
                                                color="gray.300"
                                            />
                                        }
                                        onClick={() => {
                                            setGlobalFilter("");
                                        }}
                                    />
                                )
                            }
                        </InputGroup>
                    </Box>
                )
            }
            <TableContainer className="table-container">
                <Table {...getTableProps()} variant="simple" size="md">
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        <Flex align={"center"} gap={"10px"}>
                                            <Box as="span"> {column.render("Header")} </Box>
                                            {
                                                column.isSorted && (
                                                    <Box as="span">
                                                        {
                                                            column.isSortedDesc ? (
                                                                <ArrowDownIcon boxSize={3} ml={2} />
                                                            ) : (
                                                                <ArrowUpIcon boxSize={3} ml={2} />
                                                            )
                                                        }
                                                    </Box>
                                                )
                                            }
                                        </Flex>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {
                            page?.map((row) => {
                                prepareRow(row);
                                return (
                                    <Tr {...row.getRowProps()}>
                                        {row?.cells?.map((cell) => {
                                            return (
                                                <Td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </Td>
                                            );
                                        })}
                                    </Tr>
                                );
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex flexDir='column' align={"center"} justify={"center"} mt={"40px"} gap={"5px"}>
                <Flex width='100%' p={2} borderRadius='5px' justifyContent='center'>
                    <Button
                        size={"xs"}
                        onClick={() => gotoPage(0)}
                        isDisabled={!canPreviousPage}
                        color='blue.600'
                    >
                        First Page
                    </Button>{" "}
                    <Button
                        size={"xs"}
                        onClick={() => previousPage()}
                        isDisabled={!canPreviousPage}
                        m={1}
                    >
                        <Icon boxSize={4} as={FiChevronLeft} />
                    </Button>{" "}
                    <Button
                        size={"xs"}
                        onClick={() => nextPage()}
                        isDisabled={!canNextPage}
                        m={1}
                    >
                        <Icon boxSize={4} as={FiChevronRight} />
                    </Button>{" "}
                    <Button
                        size={"xs"}
                        onClick={() => gotoPage(pageCount - 1)}
                        isDisabled={!canNextPage}
                        color='blue.600'
                    >
                        Last Page
                    </Button>{" "}
                </Flex>
                <Flex>
                    <Text mr={2} fontSize="100%">
                        Page <strong>{pageIndex + 1}</strong> of{" "}
                        <strong>{pageCount}</strong>
                    </Text>
                </Flex>
                <Box>
                    <Select
                        value={pageSize}
                        size={{ base: 'sm' }}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </Select>
                </Box>
            </Flex>
        </Box>
    );
}
export default CustomTable;