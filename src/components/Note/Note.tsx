import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "../NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface NoteProps {
  onDelete: (id: string) => void;
}

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>

        <Col xs="auto">
          <Stack gap={3} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary" className="btn btn-success btn-lg custom-bg-pr">
                Edit
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              className="btn-lg"
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary" className="btn-lg custom-bg-sc">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
