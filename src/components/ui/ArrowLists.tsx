import { List, ListItem } from "@patternfly/react-core";
import { ArrowRightIcon } from "@patternfly/react-icons";
import type { List as ListType } from "@site/src/types/content";

export function ArrowLists({ items }: { items: ListType }) {
  return (
    <List isPlain>
      {items?.map((item, i) => (
        <ListItem
          icon={
            <ArrowRightIcon color="var(--pf-t--global--color--nonstatus--blue--default)" />
          }
          key={i}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
}
