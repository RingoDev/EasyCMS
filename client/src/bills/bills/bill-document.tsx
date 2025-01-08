import React, { useMemo } from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Svg,
  G,
  Path,
} from "@react-pdf/renderer";
import { Entry, PDFProps } from "./bills";
import { dateToString } from "./pdf-inputs";
import { euroPad } from "../../util/padding";

const BillDocument: React.FC<PDFProps> = (props) => {
  return useMemo(
    () => (
      <>
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Logo />
              <View style={styles.address}>
                <View>
                  <View>
                    <Text style={styles.smallAddress}>
                      Gasthof Stöffelbauer - Linzerstraße 17 - 3350 Haag
                    </Text>
                  </View>
                  <View>
                    {props.debtor.split("\n").map((a, index) => (
                      <Text key={index}>{a}</Text>
                    ))}
                  </View>
                </View>
                <View>
                  <View style={styles.owner}>
                    <Text>Gasthof Stöffelbauer</Text>
                    <Text>Linzerstraße 17</Text>
                    <Text>3350 Haag</Text>
                  </View>
                </View>
              </View>
              <View style={styles.meta}>
                <View style={styles.metaRow}>
                  <View style={{ ...styles.metaCell, ...styles.left }}>
                    <Text style={tableStyles.text}>Rechnungs-Nr.:</Text>
                  </View>
                  <View style={{ ...styles.metaCell, ...styles.right }}>
                    <Text style={tableStyles.text}>{props.invoiceNr}</Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <View style={{ ...styles.metaCell, ...styles.left }}>
                    <Text style={tableStyles.text}>Rechnungs-Datum:</Text>
                  </View>
                  <View style={{ ...styles.metaCell, ...styles.right }}>
                    <Text style={tableStyles.text}>
                      {" "}
                      {dateToString(props.date, true, ".")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.body}>
              <Text style={styles.title}>{props.title}</Text>

              <View>
                <Text style={styles.betreff}>{props.subject}</Text>
              </View>
              <Table entries={props.entries} />
            </View>
            <View style={styles.footer} fixed>
              <View style={{ ...styles.footerItem, ...styles.item1 }}>
                <Text>Gasthof Stöffelbauer</Text>
                <Text>Linzerstraße 17</Text>
                <Text>3350 Haag</Text>
                <Text>UID: ATU17190402</Text>
              </View>

              <View style={{ ...styles.footerItem, ...styles.item2 }}>
                <Text>Bankverbindung bei RAIKA</Text>
                <Text>BIC: RLNWATWWSVH</Text>
                <Text>IBAN: AT91 3202 5000 0800 0432</Text>
              </View>

              <View style={{ ...styles.footerItem, ...styles.item3 }}>
                <Text>Telefon: +43 7434/42310</Text>
                <Text>E-Mail: office@stefflwirt.at</Text>
                <Text>Web: www.stefflwirt.at</Text>
              </View>
            </View>

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        </Document>
      </>
    ),
    [props],
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    position: "relative",
    fontSize: 12,
    padding: "35 50 100 50",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  body: {
    paddingTop: 2,
  },
  smallAddress: {
    fontSize: 10,
    textDecoration: "underline",
    paddingBottom: 10,
  },
  address: {
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "50%",
    marginLeft: "auto",
    padding: "0 20 20 0",
  },
  owner: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 30,
    fontWeight: "extrabold",
    paddingBottom: 5,
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    paddingTop: 70,
    paddingLeft: 320,
  },
  metaRow: {
    display: "flex",
    flexDirection: "row",
  },
  metaCell: {
    flexGrow: 1,
    flexShrink: 3,
    flexBasis: 1 / 16,
    display: "flex",
    padding: "2  0",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
  betreff: {
    fontSize: 12,
    paddingVertical: 15,
  },
  footer: {
    // backgroundColor:"#cccccc",
    position: "absolute",
    bottom: 25,
    width: "82%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#777777",
  },
  footerItem: {
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // flexBasis:1/3
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 1 / 3,
  },
  item1: {
    alignItems: "flex-start",
  },
  item2: {
    alignSelf: "center",
  },
  item3: {
    alignItems: "flex-end",
  },
});

const Table: React.FC<{ entries: Entry[] }> = (props) => {
  const sumNoTax =
    Math.round(
      props.entries
        .map((e) => e.brutto * e.amount)
        .reduce((p1, p2) => p1 + p2, 0) * 100,
    ) / 100;

  const sumVat =
    Math.round(
      props.entries
        .map((e) => e.brutto * e.amount * (e.vat / 100))
        .reduce((p1, p2) => p1 + p2, 0) * 100,
    ) / 100;

  return (
    <>
      <View style={tableStyles.table}>
        <View style={{ ...tableStyles.tableRow, ...tableStyles.tableHead }}>
          <View style={tableStyles.tableCell}>
            <Text style={tableStyles.text}>Datum</Text>
          </View>
          <View
            style={{ ...tableStyles.tableCell, ...tableStyles.description }}
          >
            <Text style={tableStyles.text}>Beschreibung</Text>
          </View>
          <View style={tableStyles.tableCell}>
            <Text style={tableStyles.text}>Menge</Text>
          </View>
          <View style={tableStyles.tableCell}>
            <Text style={tableStyles.text}>Einzelpreis</Text>
          </View>
          <View style={tableStyles.tableCell}>
            <Text style={tableStyles.text}>MwSt.</Text>
          </View>
          <View style={tableStyles.tableCell}>
            <Text style={tableStyles.text}>Gesamt</Text>
          </View>
        </View>
        {props.entries.map((e, index) => (
          <View key={index} style={tableStyles.tableRow}>
            <View style={tableStyles.tableCell}>
              <Text style={tableStyles.text}>
                {dateToString(e.date, true, ".")}
              </Text>
            </View>
            <View
              style={{ ...tableStyles.tableCell, ...tableStyles.description }}
            >
              <Text style={tableStyles.text}>{e.description}</Text>
            </View>
            <View style={tableStyles.tableCell}>
              <Text style={tableStyles.text}>{e.amount}</Text>
            </View>
            <View style={tableStyles.tableCell}>
              <Text style={tableStyles.text}>{euroPad(e.brutto)}</Text>
            </View>
            <View style={tableStyles.tableCell}>
              <Text style={tableStyles.text}>{e.vat}%</Text>
            </View>
            <View style={{ ...tableStyles.tableCell, ...tableStyles.result }}>
              <Text style={tableStyles.text}>
                {euroPad(Math.round(e.brutto * e.amount * 100) / 100)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={tableStyles.summary} wrap={false}>
        <View style={{ ...tableStyles.summaryRow }}>
          <View
            style={{ ...tableStyles.summaryTableCell, ...tableStyles.left }}
          >
            <Text style={tableStyles.text}>Summe Netto</Text>
          </View>
          <View
            style={{ ...tableStyles.summaryTableCell, ...tableStyles.right }}
          >
            <Text style={tableStyles.text}>{euroPad(sumNoTax)}</Text>
          </View>
        </View>
        <View style={{ ...tableStyles.summaryRow }}>
          <View
            style={{ ...tableStyles.summaryTableCell, ...tableStyles.left }}
          >
            <Text style={tableStyles.text}>MwSt.</Text>
          </View>
          <View
            style={{ ...tableStyles.summaryTableCell, ...tableStyles.right }}
          >
            <Text style={tableStyles.text}>{euroPad(sumVat)}</Text>
          </View>
        </View>
        <View style={{ ...tableStyles.summaryRow }}>
          <View
            style={{ ...tableStyles.summaryTableCell, ...tableStyles.left }}
          >
            <Text style={tableStyles.text}>Gesamt</Text>
          </View>
          <View
            style={{ ...tableStyles.summaryTableCell, ...tableStyles.right }}
          >
            <Text style={tableStyles.text}>{euroPad(sumVat + sumNoTax)}</Text>
            {/*{console.log(sumVat + sumNoTax)}*/}
          </View>
        </View>
      </View>
    </>
  );
};
const borderWidth = 0.5;

const tableStyles = StyleSheet.create({
  table: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: 10,
  },
  tableHead: {
    backgroundColor: "#cccccc",
    border: "none",
  },
  tableRow: {
    borderBottomColor: "#999999",
    borderBottomStyle: "solid",
    borderBottomWidth: borderWidth,
    display: "flex",
    flexDirection: "row",
  },
  tableCell: {
    flexGrow: 1,
    flexShrink: 3,
    flexBasis: 1 / 16,
    display: "flex",
    padding: "10  5",
  },
  description: {
    flexGrow: 2,
    flexBasis: 1,
  },
  result: {
    textAlign: "right",
  },
  text: {
    marginVertical: "auto",
  },

  summary: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginLeft: 270,
    marginTop: 15,
    borderBottomColor: "#999999",
    borderBottomStyle: "solid",
    borderBottomWidth: borderWidth,
    fontSize: 10,
  },
  summaryRow: {
    display: "flex",
    flexDirection: "row",
  },
  summaryTableCell: {
    flexGrow: 1,
    flexShrink: 3,
    flexBasis: 1 / 16,
    display: "flex",
    padding: "3  5",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
});

const logoStyles = StyleSheet.create({
  logo: {
    width: 200,
    marginLeft: 300,
    marginBottom: 20,
    border: "none",
  },
});

const Logo = () => {
  return (
    <>
      <Svg style={logoStyles.logo} viewBox={"0 0 594 180"}>
        <G transform="translate(-1.5 -186.48)" stroke={"none"} fill={"none"}>
          <G fill={"#1d1d1b"} stroke={"#1d1d1b"} strokeWidth={"2"}>
            <Path d="M168.19,204.88a18.21,18.21,0,0,1,1.5-7.6,16,16,0,0,1,4-5.5,17.07,17.07,0,0,1,5.45-3.2,17.74,17.74,0,0,1,12.3,0,18.34,18.34,0,0,1,5.55,3.2,16.78,16.78,0,0,1,3.9,5.5,18.21,18.21,0,0,1,1.5,7.6v3.6h-10.2v-3.6q0-3.69-2.05-5.45a7.6,7.6,0,0,0-9.7,0q-2.06,1.75-2.05,5.45v37.6q0,3.71,2.05,5.45a7.6,7.6,0,0,0,9.7,0q2.06-1.74,2.05-5.45v-13.4h-8.1v-9h18.3v22.4a18,18,0,0,1-1.5,7.7,15.82,15.82,0,0,1-3.9,5.3,17.1,17.1,0,0,1-5.55,3.3,17.74,17.74,0,0,1-12.3,0,16,16,0,0,1-5.45-3.3,15.17,15.17,0,0,1-4-5.3,18,18,0,0,1-1.5-7.7Z" />
            <Path d="M206.79,259.28l15.9-71.2h8.5l15.9,71.2h-10.2l-3-15.3H220l-3,15.3Zm25.2-24.9-5-25.8h-.2l-5,25.8Z" />
            <Path d="M285.09,208.58h-10.2v-2.3a10.9,10.9,0,0,0-1.65-6.05q-1.65-2.55-5.55-2.55a6.46,6.46,0,0,0-3.4.8,6.71,6.71,0,0,0-2.1,2,8.55,8.55,0,0,0-1.1,3,19.26,19.26,0,0,0-.3,3.45,33.77,33.77,0,0,0,.15,3.5,6.59,6.59,0,0,0,.75,2.5,5.44,5.44,0,0,0,1.75,1.9,15.73,15.73,0,0,0,3.15,1.6l7.8,3.1a19.54,19.54,0,0,1,5.5,3.05,13.26,13.26,0,0,1,3.3,4.05,19.18,19.18,0,0,1,1.5,5.45,53.41,53.41,0,0,1,.4,6.95,36.61,36.61,0,0,1-.9,8.35,17.62,17.62,0,0,1-2.9,6.55,14.28,14.28,0,0,1-5.5,4.4,19.35,19.35,0,0,1-8.3,1.6,18.07,18.07,0,0,1-6.9-1.3,16.21,16.21,0,0,1-5.5-3.6,17.46,17.46,0,0,1-3.65-5.35,16.23,16.23,0,0,1-1.35-6.65v-3.8h10.2v3.2a8.32,8.32,0,0,0,1.65,5.05q1.65,2.25,5.55,2.25a9,9,0,0,0,4.05-.75,5.31,5.31,0,0,0,2.25-2.15,7.93,7.93,0,0,0,.95-3.35q.15-2,.15-4.35a44.1,44.1,0,0,0-.2-4.6,7.89,7.89,0,0,0-.8-2.9,5.69,5.69,0,0,0-1.85-1.8,25.6,25.6,0,0,0-3.05-1.5l-7.3-3q-6.6-2.7-8.85-7.15A24.57,24.57,0,0,1,250.59,207a26,26,0,0,1,1.1-7.6,17.24,17.24,0,0,1,3.3-6.2,15.21,15.21,0,0,1,5.35-4.15,17.92,17.92,0,0,1,7.75-1.55,17,17,0,0,1,7,1.4,18,18,0,0,1,5.45,3.7,15.44,15.44,0,0,1,4.6,11Z" />
            <Path d="M299.39,259.28v-61.6h-11.8v-9.6h33.8v9.6h-11.8v61.6Z" />
            <Path d="M325.89,259.28v-71.2h10.2v30.5h12.6v-30.5h10.2v71.2h-10.2v-31.7h-12.6v31.7Z" />
            <Path d="M367.89,204.88a18.21,18.21,0,0,1,1.5-7.6,16,16,0,0,1,4-5.5,17,17,0,0,1,5.45-3.2,17.74,17.74,0,0,1,12.3,0,18.34,18.34,0,0,1,5.55,3.2,16.78,16.78,0,0,1,3.9,5.5,18.21,18.21,0,0,1,1.5,7.6v37.6a18,18,0,0,1-1.5,7.7,15.82,15.82,0,0,1-3.9,5.3,17.1,17.1,0,0,1-5.55,3.3,17.74,17.74,0,0,1-12.3,0,15.88,15.88,0,0,1-5.45-3.3,15.17,15.17,0,0,1-4-5.3,18,18,0,0,1-1.5-7.7Zm10.2,37.6q0,3.71,2.05,5.45a7.6,7.6,0,0,0,9.7,0c1.36-1.16,2.05-3,2.05-5.45v-37.6c0-2.46-.69-4.28-2.05-5.45a7.6,7.6,0,0,0-9.7,0q-2.06,1.75-2.05,5.45Z" />
            <Path d="M411.09,259.28v-71.2h30.4v9.6h-20.2v21.6h17.6v9.6h-17.6v30.4Z" />
          </G>

          <G strokeWidth={"2"} fill={"#015125"} stroke={"#015125"}>
            <Path d="M62,278.27H44.66v-3.91a18.49,18.49,0,0,0-2.81-10.28q-2.81-4.33-9.43-4.34a10.87,10.87,0,0,0-5.78,1.36,11.29,11.29,0,0,0-3.57,3.4,14.32,14.32,0,0,0-1.87,5,32.69,32.69,0,0,0-.51,5.86,57.7,57.7,0,0,0,.25,5.95,11.3,11.3,0,0,0,1.28,4.25,9.47,9.47,0,0,0,3,3.23,27.49,27.49,0,0,0,5.36,2.72l13.26,5.27A32.68,32.68,0,0,1,53.16,302a22.32,22.32,0,0,1,5.61,6.88,32.62,32.62,0,0,1,2.55,9.27A92.13,92.13,0,0,1,62,330a62.39,62.39,0,0,1-1.53,14.2,30,30,0,0,1-4.93,11.13,24.4,24.4,0,0,1-9.35,7.48,33.06,33.06,0,0,1-14.11,2.72,30.88,30.88,0,0,1-11.73-2.21A27.7,27.7,0,0,1,11,357.15a29.84,29.84,0,0,1-6.21-9.09A27.65,27.65,0,0,1,2.5,336.75v-6.46H19.84v5.44a14.16,14.16,0,0,0,2.8,8.59q2.81,3.82,9.44,3.82A15.21,15.21,0,0,0,39,346.87a9.14,9.14,0,0,0,3.83-3.66,13.51,13.51,0,0,0,1.61-5.69q.26-3.31.26-7.4a75.13,75.13,0,0,0-.34-7.82A13.54,13.54,0,0,0,43,317.37a9.51,9.51,0,0,0-3.15-3.06,41.09,41.09,0,0,0-5.18-2.55l-12.41-5.1q-11.22-4.59-15-12.15t-3.82-19a43.88,43.88,0,0,1,1.87-12.92,29.21,29.21,0,0,1,5.61-10.54A25.6,25.6,0,0,1,19.92,245,30.35,30.35,0,0,1,33.1,242.4a28.71,28.71,0,0,1,11.81,2.38,30.5,30.5,0,0,1,9.27,6.29A26.27,26.27,0,0,1,62,269.77Z" />
            <Path d="M80.26,364.46V288.08H65.62V276.17h41.92v11.91H92.91v76.38Z" />
            <Path d="M110.88,297a22.56,22.56,0,0,1,1.86-9.42,20,20,0,0,1,5-6.82,21,21,0,0,1,6.76-4,22.53,22.53,0,0,1,22.14,4,20.8,20.8,0,0,1,4.83,6.82,22.56,22.56,0,0,1,1.86,9.42v46.63a22.38,22.38,0,0,1-1.86,9.55,19.83,19.83,0,0,1-4.83,6.57,21.33,21.33,0,0,1-6.89,4.09,21.9,21.9,0,0,1-15.25,0,20,20,0,0,1-6.76-4.09,19.09,19.09,0,0,1-5-6.57,22.38,22.38,0,0,1-1.86-9.55Zm5.58-26.28V258.07h11.16v12.65Zm7.07,72.91q0,4.59,2.54,6.76a9.42,9.42,0,0,0,12,0c1.7-1.45,2.54-3.7,2.54-6.76V297c0-3.05-.84-5.31-2.54-6.75a9.42,9.42,0,0,0-12,0c-1.69,1.44-2.54,3.7-2.54,6.75Zm13-72.91V258.07h11.16v12.65Z" />
            <Path d="M164.45,364.46V276.17h37.7v11.91H177.1v26.78h21.82v11.9H177.1v37.7Z" />
            <Path d="M210.33,364.46V276.17H248v11.91H223v26.78H244.8v11.9H223v37.7Z" />
            <Path d="M256.21,364.46V276.17h37.7v11.91H268.86V314h21.82V325.9H268.86v25.91h25.05v12.65Z" />
            <Path d="M302.09,364.46V276.17h12.65v75.64h25.05v12.65Z" />
            <Path d="M348,364.46V276.17h18.48A25.88,25.88,0,0,1,376.8,278a19.66,19.66,0,0,1,7,5,18.76,18.76,0,0,1,3.9,7.13,29.55,29.55,0,0,1,1.18,8.37v3.23a28.19,28.19,0,0,1-.56,6.07,14.6,14.6,0,0,1-1.67,4.34,17.39,17.39,0,0,1-6.45,5.95,13.7,13.7,0,0,1,6.57,6.21q2.12,4.08,2.11,11.16v5q0,11.65-5.64,17.85t-18,6.2Zm12.65-76.38v24.3h5.7q6.33,0,8.5-3.16C376.26,307.11,377,304,377,300s-.81-6.94-2.42-8.93-4.53-3-8.74-3Zm0,35.46v28.27h5.45a13.44,13.44,0,0,0,6-1.11,7.75,7.75,0,0,0,3.28-3.1,11.67,11.67,0,0,0,1.37-4.72c.16-1.81.25-3.8.25-5.95a39.56,39.56,0,0,0-.38-5.83,10.56,10.56,0,0,0-1.48-4.21,7.18,7.18,0,0,0-3.35-2.54,15.91,15.91,0,0,0-5.58-.81Z" />
            <Path d="M393.6,364.46l19.72-88.29h10.54l19.71,88.29H430.93l-3.72-19H410l-3.72,19Zm31.25-30.88-6.2-32h-.25l-6.2,32Z" />
            <Path d="M490.69,276.17v68.45a20,20,0,0,1-5.95,14.51,21,21,0,0,1-6.57,4.46,19.68,19.68,0,0,1-7.94,1.62,19.21,19.21,0,0,1-7.87-1.62,21.48,21.48,0,0,1-11-11,19.52,19.52,0,0,1-1.62-8V276.17h12.65v67.21c0,3.14.75,5.46,2.23,6.95a8.1,8.1,0,0,0,11.16,0q2.24-2.24,2.23-6.95V276.17Z" />
            <Path d="M502.6,364.46V276.17h37.69v11.91h-25V314h21.83V325.9H515.24v25.91h25v12.65Z" />
            <Path d="M548.48,364.46V276.17h20.33q22.32,0,22.32,25.92a32.54,32.54,0,0,1-2.42,13.27,18.71,18.71,0,0,1-8.49,8.8l13.64,40.3H580.47l-11.78-37.7h-7.57v37.7Zm12.64-76.38V315.6h7.2a12.71,12.71,0,0,0,5.33-.93,7.27,7.27,0,0,0,3.1-2.66,12.18,12.18,0,0,0,1.36-4.28,47.07,47.07,0,0,0,0-11.78,11.74,11.74,0,0,0-1.49-4.4q-2.36-3.46-8.92-3.47Z" />
          </G>

          <G fill={"none"} stroke={"#ffffff"} />
        </G>
      </Svg>
    </>
  );
};

export default BillDocument;
