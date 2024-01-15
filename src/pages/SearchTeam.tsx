import PublicCard from '../components/PublicCard';
import { Layout } from '../components/Layout';

export default function SearchTeamPage() {
  return (
    <Layout>
      SearchTeamPage<div>--searchcomponent--</div>
      <PublicCard teamId={1} name="모임1" color="aqua" description="description" />
      <PublicCard
        teamId={2}
        name="모임2"
        color="black"
        description="descriptiondescriptiondescriptionptiond escriptiondescriptionptiondescriptio ndescriptionptiondescriptiondescriptionptio ndescriptiondescriptionptiondescriptiondescription ndescriptiondescriptionptiondescriptiondescription"
      />
      <PublicCard teamId={3} name="모임3" color="yellow" description="description" />
    </Layout>
  );
}
