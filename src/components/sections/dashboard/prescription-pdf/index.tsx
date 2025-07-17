'use client';

import { Document, Page, Text, View } from '@react-pdf/renderer';

const PrescriptionPdf = ({ data }: { data: any }) => {
  const { clinic, patient, prescription, medications, comments, reportedBy, drRegistrationNo } = data;

  return (
    <Document>
      <Page size="A4" style={{ padding: 40, fontSize: 11, fontFamily: 'Helvetica', color: '#312D2D' }}>
        {/* Header Section */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 28,
            justifyContent: 'center',
          }}
        >
          <View style={{ textAlign: 'center', width: '300px', color: '#312D2D', fontSize: '10px', fontWeight: 700 }}>
            <Text style={{ marginBottom: 4 }}>{clinic?.name}</Text>
            <Text style={{ marginBottom: 2 }}>{clinic?.address}</Text>
            <Text style={{ marginBottom: 2 }}>{clinic?.phone}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}
        >
          <View style={{ width: '45%' }}>
            <Text style={{ fontSize: 24, color: '#2D58E6', fontWeight: 700, marginBottom: 10 }}>Prescription</Text>
            <View
              style={{
                marginBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Text style={{ color: '#969696', fontSize: 13 }}>Prescription No.</Text>
              <Text style={{ color: '#969696', fontSize: 13 }}>#{prescription?.prescription_number}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
              <Text style={{ color: '#969696', fontWeight: 600 }}>Prescription Date:</Text>
              <Text style={{ color: '#2D58E6' }}>{prescription?.prescription_date}</Text>
            </View>
          </View>
          <View style={{ width: '30%' }}>
            <Text style={{ fontSize: 16, color: '#2D58E6', fontWeight: 'bold', marginBottom: 10 }}>
              {patient?.name}
            </Text>
            <Text style={{ marginBottom: 8, color: '#2D58E6' }}>{patient?.date_of_birth}</Text>
            <Text style={{ marginBottom: 8, color: '#969696' }}>{patient?.email}</Text>
            <Text style={{ marginBottom: 8, color: '#969696' }}>{patient?.address}</Text>
            <Text style={{ marginBottom: 8, color: '#969696' }}>{patient?.phone}</Text>
          </View>
        </View>

        {/* Table Section */}
        <View style={{ marginTop: 20, marginBottom: 20, borderRight: 1, borderLeft: 1, borderColor: '#eee' }}>
          {/* Table Header */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#2D58E6',
              paddingHorizontal: 12,
              paddingVertical: 16,
              marginBottom: 1,
            }}
          >
            <Text style={{ width: '25%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Name of Drug</Text>
            <Text style={{ width: '15%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Strength</Text>
            <Text style={{ width: '15%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Formulation</Text>
            <Text style={{ width: '25%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
              Dose Instruction
            </Text>
            <Text style={{ width: '20%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>QTY</Text>
          </View>

          {/* Table Rows */}
          {medications?.map((medication: any, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                borderBottom: 1,
                borderColor: '#eee',
              }}
            >
              <Text
                style={{
                  width: '25%',
                  textAlign: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderRight: 1,
                  borderColor: '#eee',
                }}
              >
                {medication?.nameOfDrug}
              </Text>
              <Text
                style={{
                  width: '15%',
                  textAlign: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderRight: 1,
                  borderColor: '#eee',
                }}
              >
                {medication?.strength}
              </Text>
              <Text
                style={{
                  width: '15%',
                  textAlign: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderRight: 1,
                  borderColor: '#eee',
                }}
              >
                {medication?.formulation}
              </Text>
              <Text
                style={{
                  width: '25%',
                  textAlign: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderRight: 1,
                  borderColor: '#eee',
                }}
              >
                {medication?.doseInstruction}
              </Text>
              <Text
                style={{
                  width: '20%',
                  textAlign: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                }}
              >
                {medication?.qty}
              </Text>
            </View>
          ))}
        </View>

        {/* Comments Section */}
        <View style={{ marginBottom: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
            <Text style={{ color: '#2D58E6', fontWeight: 'bold' }}>Comment:</Text>
            <Text style={{ color: '#969696', flex: 1 }}>{comments}</Text>
          </View>
        </View>

        {/* Footer Section */}
        <View
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <View style={{ width: '45%' }}>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ color: '#2D58E6', fontWeight: 'bold', marginBottom: 4 }}>Reported by:</Text>
              <Text style={{ color: '#969696', fontWeight: 'bold' }}>{reportedBy}</Text>
            </View>
          </View>
          <View style={{ width: '45%' }}>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ color: '#2D58E6', fontWeight: 'bold', marginBottom: 4 }}>DR. Registration no.</Text>
              <Text style={{ color: '#969696', fontWeight: 'bold' }}>{drRegistrationNo}</Text>
            </View>
            <View>
              <Text style={{ color: '#2D58E6', fontWeight: 'bold', marginBottom: 4 }}>Clinic Email</Text>
              <Text style={{ color: '#969696', fontWeight: 'bold' }}>{clinic?.email}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PrescriptionPdf;
